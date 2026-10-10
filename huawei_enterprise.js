/*
 * 华为企业业务 App 动态配置过滤脚本
 */
let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                // 1. 过滤租户通用设置中的广告、红点及弹窗配置
                if (item.tsettings && Array.isArray(item.tsettings)) {
                    item.tsettings = item.tsettings.filter(setting => {
                        const adKeys = [
                            "splash", 
                            "banner", 
                            "ad_", 
                            "popup", 
                            "upgrade.remind", 
                            "reddot"
                        ];
                        return !adKeys.some(key => setting.key.toLowerCase().includes(key));
                    });
                }

                // 2. 过滤模块内部的相关设置
                if (item.modules && Array.isArray(item.modules)) {
                    item.modules.forEach(mod => {
                        if (mod.settings && Array.isArray(mod.settings)) {
                            mod.settings = mod.settings.filter(setting => {
                                return !setting.key.toLowerCase().includes("reddot") &&
                                       !setting.key.toLowerCase().includes("ad");
                            });
                        }
                    });
                }
            });
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
