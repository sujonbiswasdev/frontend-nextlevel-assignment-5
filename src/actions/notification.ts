"use server";
import { NotificationService } from "@/services/notification";

export const getUserNotificationsAction = async () => {
  return await NotificationService.getUserNotifications();
};

export const updateNotificationAction = async ({
  notificationId,
  action,
  invitationId,
}: {
  notificationId: string;
  action: "READ" | "ACCEPT" | "DECLINE";
  invitationId?: string;
}) => {
  return await NotificationService.updateNotification({
    notificationId,
    action,
    invitationId,
  });
};