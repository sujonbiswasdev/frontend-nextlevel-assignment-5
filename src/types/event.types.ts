
import { CreateEventSchema, EventCategoryEnum, EventStatusEnum, PricingTypeEnum, UpdateEventSchema } from "@/validations/event.validation";
import z from "zod";

// type 
export type ICreateEvent = z.infer<typeof CreateEventSchema>;
export type IUpdateEvent = z.infer<typeof UpdateEventSchema>;
export type IEventCategory=z.infer<typeof EventCategoryEnum>
export type IEventPricing=z.infer<typeof PricingTypeEnum>
export type IEventStatusEnum=z.infer<typeof EventStatusEnum>

// array
 const EVENT_CATEGORY_ARR =EventCategoryEnum.options ;
 const EVENT_Pricing_ARR =PricingTypeEnum.options ;
 const EVENT_Status_ARR =EventStatusEnum.options ;

export const EventArr={
  EVENT_CATEGORY_ARR,
  EVENT_Pricing_ARR,
  EVENT_Status_ARR
}




// Pagination type
export type TPagination = {
  total: number;
  page: number;
  limit: number;
  totalpage: number;
};


export type IBaseEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    visibility?: ICreateEvent;
    priceType?: IEventPricing;
    status: IEventStatusEnum;
    is_featured: boolean;
    categories: string;
    fee: number;
    organizerId: string;
    createdAt: string;
    updatedAt: string;
    avgRating: number;
    totalReviews: number;
  };
  
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