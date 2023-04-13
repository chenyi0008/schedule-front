import request from "@/utils/request";

export function postSchedule(data) {
  return request({
    url: "schedule",
    method: "post",
    data,
  });
}