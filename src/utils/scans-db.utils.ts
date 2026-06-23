import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { type NewScanRecord, type ScanRecord, scans } from "../db/schema";

export const getScanHistory = async (): Promise<ScanRecord[]> => {
  return db.select().from(scans).orderBy(desc(scans.createdAt));
};

export const deleteScan = async (id: number) => {
  return db.delete(scans).where(eq(scans.id, id));
};

export const addScan = async (scan: NewScanRecord) => {
  return db.insert(scans).values(scan);
};
