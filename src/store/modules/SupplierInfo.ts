/*
 * @Author: SachieW
 * @Date: 2021-04-14 14:30:26
 * @LastEditTime: 2021-04-14 17:58:45
 * @LastEditors: SachieW
 * @Description: 
 * @FilePath: \erp-vue-ts\src\store\modules\SupplierInfo.ts
 */

import config from "@/config";
import XEAjax from "xe-ajax";

const state = () => ({
    OPTS: [],
});


const actions = {
    async getSupplierOPTS({ commit, state }: any) {
        if (state.OPTS.length != 0) return Promise.resolve(true);
        try {
            const res = await XEAjax.post(
                `http://` + config.host + `:8080/vendor/queryByParam`,
                { limit: 1000, start: 0 }
            );
            const opts: { label: any; value: any; }[] = [];
            res.data.forEach(({ vendorCode, vendorName }: any) => {
                opts.push({ label: vendorName, value: vendorCode })
            });
            commit("setSupplierOPTS", opts);
        } catch (error) {
            console.log(error);
        }
    },
    async updateSupplierOPTS({ commit }: any) {
        console.log("Update Supplier OPTS");
        try {
            const res = await XEAjax.post(
                `http://` + config.host + `:8080/vendor/queryByParam`,
                { limit: 1000, start: 0 }
            );
            const opts: { label: any; value: any; }[] = [];
            res.data.forEach(({ vendorCode, vendorName }: any) => {
                opts.push({ label: vendorName, value: vendorCode })
            });
            commit("setSupplierOPTS", opts);
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    setSupplierOPTS(state: any, opts: any) {
        state.OPTS = opts;
    }
}

export default {
    state,
    mutations,
    actions,
};
