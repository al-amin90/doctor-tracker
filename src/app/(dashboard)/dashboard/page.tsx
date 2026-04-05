"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import PatientsPerDoctorChart from "@/components/dashboard/PatientsPerDoctorChart";
import DailyRegistrationChart from "@/components/dashboard/DailyRegistrationChart";
import ConditionBreakdownChart from "@/components/dashboard/ConditionBreakdownChart";
import { Stethoscope, Users, Activity, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

export default function DashboardPage() {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const stats = data?.data;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Doctors"
          value={stats?.totalDoctors ?? 0}
          subtitle="Registered in system"
          icon={Stethoscope}
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients ?? 0}
          subtitle="Across all doctors"
          icon={Users}
          color="emerald"
          isLoading={isLoading}
        />
        <StatsCard
          title="Avg Patients / Doctor"
          value={
            stats?.totalDoctors
              ? (stats.totalPatients / stats.totalDoctors).toFixed(1)
              : "0"
          }
          subtitle="System average"
          icon={Activity}
          color="violet"
          isLoading={isLoading}
        />
        <StatsCard
          title="Registered Today"
          value={
            stats?.dailyRegistrations?.[stats.dailyRegistrations.length - 1]
              ?.patients ?? 0
          }
          subtitle="New patients today"
          icon={Calendar}
          color="amber"
          isLoading={isLoading}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Patients per Doctor
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Top 10 doctors by patient count
            </p>
          </div>
          {isLoading ? (
            <Skeleton className="h-[260px] w-full rounded-xl" />
          ) : (
            <PatientsPerDoctorChart data={stats?.patientsPerDoctor ?? []} />
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Daily Registrations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              New patients — last 14 days
            </p>
          </div>
          {isLoading ? (
            <Skeleton className="h-[260px] w-full rounded-xl" />
          ) : (
            <DailyRegistrationChart data={stats?.dailyRegistrations ?? []} />
          )}
        </div>
      </div>

      {/* Charts Row 2 + Recent Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Condition Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Condition Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Patients by medical condition
            </p>
          </div>
          {isLoading ? (
            <Skeleton className="h-[260px] w-full rounded-xl" />
          ) : (
            <ConditionBreakdownChart data={stats?.conditionBreakdown ?? []} />
          )}
        </div>

        {/* Recent Doctors */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Recent Doctors
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest 5 registrations
            </p>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                  </div>
                ))
              : stats?.recentDoctors?.map((d) => (
                  <div key={d._id} className="flex items-center gap-3 group">
                    <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                      <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                        {d.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {d.specialization}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 shrink-0">
                      {format(parseISO(d.createdAt), "MMM d")}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">
              Recent Patients
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest 5 registrations
            </p>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                  </div>
                ))
              : stats?.recentPatients?.map((p) => (
                  <div key={p._id} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                        {p.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs h-4 px-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-normal"
                      >
                        {p.condition}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 shrink-0">
                      {format(parseISO(p.createdAt), "MMM d")}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
