import { EventCategoryEnum } from "@/validations/event.validation";
import z from "zod";

// Pagination type
export type TPagination = {
  total: number;
  page: number;
  limit: number;
  totalpage: number;
};

export type EventStatus =
  | "DRAFT"
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export type EventType = "PUBLIC" | "PRIVATE";

export type PricingType = "FREE" | "PAID";
export type EventCategory = z.infer<typeof EventCategoryEnum>;
export const eventcategoryArr=EventCategoryEnum.options

export type TCreateEvent = {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  visibility: EventType;
  priceType: PricingType;
  categories: EventCategory;
  fee?: number;
};

export type TUpdateEvent = Partial<TCreateEvent>;

export type IBaseEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    visibility?: EventType;
    priceType?: PricingType;
    status: EventStatus;
    is_featured: boolean;
    categories: string;
    fee: number;
    organizerId: string;
    createdAt: string;
    updatedAt: string;
    avgRating: number;
    totalReviews: number;
  };
  
  // Generic Event response type (can extend with extra fields)
  export type TResponseEvent<T = unknown> = IBaseEvent & T;

  export type TEventsGroupedResponse<T = unknown> = {
    success: boolean;
    message: string;
    data: {
     data:{
        DRAFT: TResponseEvent<T>[];
        UPCOMING: TResponseEvent<T>[];
        ONGOING: TResponseEvent<T>[];
        COMPLETED: TResponseEvent<T>[];
        CANCELLED: TResponseEvent<T>[];
     }
    };
  };