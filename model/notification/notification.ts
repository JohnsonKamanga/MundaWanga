import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createNotificationTable } from "../schema";

export type TNotification = {
  id?: number;
  data: string;
  title: string;
  body: string;
  added_date: number;
};

const notificationMapping: ColumnMapping<TNotification> = {
  id: { type: columnTypes.INTEGER },
  data: { type: columnTypes.JSON },
  title: { type: columnTypes.TEXT },
  body: { type: columnTypes.TEXT },
  added_date: { type: columnTypes.DATETIME },
};

const notificationRepository = new Repository(
  "MundaWanga.db",
  "notification",
  notificationMapping
);

export async function addNotification(
  notification: TNotification,
  db: SQLiteDatabase
): Promise<TNotification> {
  await createNotificationTable(db);
  console.log("adding notification...");
  return notificationRepository.insert(notification);
}

export async function findAllNotifications(
  db: SQLiteDatabase
): Promise<TNotification[]> {
  console.log("finding notifications...");
  await createNotificationTable(db);
  console.log("checked if table exists...");
  console.log("notifications: ", await notificationRepository.query());
  return notificationRepository.query();
}

export async function deleteNotification(
  id: number,
  db: SQLiteDatabase
): Promise<boolean> {
  await createNotificationTable(db);
  return notificationRepository.destroy(id);
}

export function parseNotification(notification: TNotification) {
  const { data, ...others } = notification;
  return {
    ...others,
    ...JSON.parse(data),
  };
}

export async function findNotificationsByQuery(
  query: string,
  db: SQLiteDatabase,
  queryOptions?: {
    added_date?: "ASC" | "DESC";
  }
): Promise<TNotification[]> {
  const options = queryOptions
    ? {
        order: queryOptions,
      }
    : {};

  const jsonNotifications = await notificationRepository.query(
    queryOptions
      ? {
          order: queryOptions,
        }
      : undefined
  );
  const parsedNotifications: TNotification[] = [];

  for (let i = 0; i < jsonNotifications.length; i++) {
    parsedNotifications.push(parseNotification(jsonNotifications[i]));
  }
  return parsedNotifications;
}
