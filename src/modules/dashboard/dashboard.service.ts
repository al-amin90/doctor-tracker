import dbConnect from "@/lib/db/mongodb";
import DoctorModel from "../doctor/doctor.model";
import PatientModel from "../patient/patient.model";

export const getDashboardStatsService = async () => {
  await dbConnect();

  const [
    totalDoctors,
    totalPatients,
    patientsPerDoctor,
    dailyRegistrations,
    conditionBreakdown,
    recentDoctors,
    recentPatients,
  ] = await Promise.all([
    DoctorModel.countDocuments({ isDeleted: false }),

    PatientModel.countDocuments({ isDeleted: false }),

    PatientModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$doctorId", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      { $project: { doctorName: "$doctor.name", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),

    PatientModel.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          patients: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 14 },
      { $project: { date: "$_id", patients: 1, _id: 0 } },
    ]),

    PatientModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$condition", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
      { $project: { condition: "$_id", count: 1, _id: 0 } },
    ]),

    DoctorModel.find({ isDeleted: false })
      .sort("-createdAt")
      .limit(5)
      .select("name specialization hospital createdAt"),

    PatientModel.find({ isDeleted: false })
      .sort("-createdAt")
      .limit(5)
      .populate("doctorId", "name")
      .select("name condition age createdAt"),
  ]);

  return {
    totalDoctors,
    totalPatients,
    patientsPerDoctor,
    dailyRegistrations: dailyRegistrations.reverse(),
    conditionBreakdown,
    recentDoctors,
    recentPatients,
  };
};
