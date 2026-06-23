import { type ProductAnalysisResult } from "@/src/utils/generate-ai-alalysis";
import {
  customType,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// SQLite to auto-serialize and typecast objects/arrays
const customJson = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return "text";
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
    fromDriver(value: string): TData {
      try {
        return JSON.parse(value);
      } catch {
        return [] as unknown as TData;
      }
    },
  })(name);

export const scans = sqliteTable("scans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  totalScore: real("total_score").notNull(),
  finalStatus: text("final_status").notNull(),
  verdict: text("verdict").notNull(),
  numOfIngredientsAudited: integer("num_of_ingredients_audited").notNull(),
  totalRedFlags: integer("total_red_flags").notNull(),
  hack: text("hack").notNull(),

  // Storing complex array objects as auto-serialized typed fields
  ingredients:
    customJson<ProductAnalysisResult["ingredients"]>("ingredients").notNull(),
  macros: customJson<ProductAnalysisResult["macros"]>("macros").notNull(),
  per100g: customJson<ProductAnalysisResult["per100g"]>("per_100g").notNull(),

  createdAt: integer("created_at").notNull(),
});

export type ScanRecord = typeof scans.$inferSelect;
export type NewScanRecord = typeof scans.$inferInsert;
