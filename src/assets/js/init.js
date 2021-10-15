import Vue from 'vue';

import "babel-polyfill"; // 解决 IE11 Promise对象未定义
import { until, reg } from "./until";

import query from './query';
import { api } from "./api";
require('../css/common.css')
require('element-ui/lib/theme-chalk/index.css')

import ElementUI from 'element-ui';
// {
 //    Pagination,
 //    Input,
 //    InputNumber,
 //    Select,
 //    Option,
 //    OptionGroup,
 //    Button,
 //    ButtonGroup,
 //    Table,
 //    TableColumn,
 //    DatePicker,
 //    Form,
 //    FormItem,
 //    Alert,
 //    Icon,
 //    Row,
 //    Col,
 //    Loading,
 //    MessageBox,
 //    Message,
 //    Notification,
	// NavMenu
	
// }

// Vue.use(Pagination);
// Vue.use(Input);
// Vue.use(InputNumber);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(OptionGroup);
// Vue.use(Button);
// Vue.use(ButtonGroup);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(DatePicker);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Alert);

// Vue.use(Icon);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(NavMenu);
// Vue.prototype.$message = Message;
// Vue.use(Loading.directive);
Vue.use(ElementUI);
export default {
    install(Vue) {
        Vue.prototype.api = new api();
        Vue.prototype.until = new until();
        Vue.prototype.reg = new reg();
        Vue.prototype.query = query;
		// Vue.prototype.navList = [{name:'首页',url:'./index.html',canClose:false}];
    }
};
