import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields?.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "selects",
      "startDate",
      "endDate",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    const finalQuery = { isDeleted: false, ...queryObj };

    const dateFilter = {};

    if (this.query.startDate) {
      dateFilter.$gte = new Date(this.query.startDate as string);
    }

    if (this.query.endDate) {
      const endDate = new Date(this.query.endDate as string);
      endDate.setDate(endDate.getDate() + 1);
      dateFilter.$lt = endDate;
    }

    if (Object.keys(dateFilter).length > 0) {
      finalQuery.createdAt = dateFilter;
    }

    this.modelQuery = this.modelQuery.find(finalQuery);
    return this;
  }

  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const selects =
      (this?.query?.selects as string)?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(selects);
    return this;
  }

  async countTotal() {
    const filterQuery = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(filterQuery);
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const totalPage = Math.ceil(total / limit);
    return { total, page, limit, totalPage };
  }
}

export default QueryBuilder;
