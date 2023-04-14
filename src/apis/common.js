import request from "@/utils/request";

export function postSchedule(storeId) {
  return request({
    url: "schedule",
    method: "post",
    storeId,
  });
}

