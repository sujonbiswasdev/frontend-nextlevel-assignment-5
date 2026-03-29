export const getEventAction = (
    priceType: "FREE" | "PAID",
    visibility: "PUBLIC" | "PRIVATE"
  ) => {
  
    if (priceType === "FREE" && visibility === "PUBLIC") {
      return "Join Event"
    }
  
    if (priceType === "PAID" && visibility === "PUBLIC") {
      return "Pay & Join"
    }
  
    if (priceType === "FREE" && visibility === "PRIVATE") {
      return "Request to Join"
    }
  
    if (priceType === "PAID" && visibility === "PRIVATE") {
      return "Pay & Request"
    }
  
    return "Join Event"
  }