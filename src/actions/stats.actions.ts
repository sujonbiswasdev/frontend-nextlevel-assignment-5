'use server'
import { StatsServices } from "@/services/stats.services";

export async function getStatsAction() {
    const result = await StatsServices.getStats();
    return result;
}