// Base Event type

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
    visibility?: "PUBLIC" | "PRIVATE" | "PUBLIC_PAID" | "PRIVATE_PAID";
    status: "DRAFT" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED" | string;
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