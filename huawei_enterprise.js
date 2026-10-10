/*
 * 华为企业业务 App 精准过滤开屏广告
 */
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 确保数据结构存在且为数组
        if (obj.data && Array.isArray(obj.data)) {
            // 仅过滤掉 adapAdverSite 标识为 "start" (开屏) 的数据，保留其他所有首页卡片/Banner
            obj.data = obj.data.filter(item => item.adapAdverSite !== "start");
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果解析出错，直接放行原数据，避免 App 崩溃或白屏
        $done({ body });
    }
} else {
    $done({});
}
