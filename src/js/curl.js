/**
 * Created by ollie on 2017/11/17.
 */
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
new Vue({
    el: '#app',
    data(){
        return {
            mode: 'add',
            username: '',
            password: '',
            tmp_id: '',
            list: []
        }
    },
    methods: {
        fetch_list(){
            var _this = this;
            $.ajax({
                url: '/fetch_list',
                type: 'get',
                success: function (data) {
                    if (data.code == 0) {
                        _this.list = data.data;
                    }
                },
                error: function () {
                    console.log('err');
                }
            });
        },
        add(){
            this.mode = 'add';
            this.errors.clear();
            $('#myModal').modal('toggle');
        },
        add_ajax(){
            var _this = this;
            $.ajax({
                url: '/add',
                type: 'post',
                dataType: 'json',
                data: {
                    username: _this.username,
                    password: _this.password
                },
                success: function (data) {
                    if (data.code == 0) {
                        window.location.reload();
                    }
                },
                error: function () {
                    console.log('err');
                }
            });
        },
        edit(id){
            this.mode = 'edit';
            var _this = this;
            this.tmp_id = id;
            $.ajax({
                url: '/fetch_one',
                type: 'get',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.code == 0) {
                        _this.username = data.data.username;
                        _this.password = data.data.password;
                    }
                },
                error: function () {
                    console.log('err');
                }
            });
            $('#myModal').modal('toggle');
        },
        edit_ajax(id){
            var _this = this;
            $.ajax({
                url: '/edit_one',
                type: 'post',
                dataType: 'json',
                data: {
                    id: id,
                    username: _this.username,
                    password: _this.password
                },
                success: function (data) {
                    if (data.code == 0) {
                        window.location.reload();
                    }
                },
                error: function () {
                    console.log('err');
                }
            });
        },
        delete_fn(id){
            $.ajax({
                url: '/delete',
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (data) {
                    if (data.code == 0) {
                        window.location.reload();
                    }
                },
                error: function () {
                    console.log('err');
                }
            });
        },
        validateBeforeSubmit() {
            var _this = this;
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.mode == 'add') {
                        this.add_ajax();
                    } else {
                        this.edit_ajax(this.tmp_id);
                    }
                } else {
                    console.log('Correct them errors!');
                }
            }).catch(() => {
                console.log('Correct them errors!');
            });
        },
        modal_close(){
            $('#myModal').modal('hide');
            setTimeout(()=> {
                this.username = '';
                this.password = '';
            }, 300)
        }
    },
    created(){
        setTimeout(()=> {
            this.fetch_list();
        }, 1000)
    }
});