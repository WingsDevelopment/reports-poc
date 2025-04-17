export const ReportQueryKeys = {
  all: ["reports"] as const,
  single: (id: string) => [...ReportQueryKeys.all, id] as const,
};
