<template lang="html">
    <div class="create-article">
        <div class="article-title">
            文章标题： <input type="text" v-model="artTitle" placeholder="请输入文章标题！">
        </div>
        <div class="creat-editor">
            <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="quill-code">
          <!-- <code class="hljs" v-html="contentCode"></code> -->
        </div>
        <div class="create-options">
            <span @click="createArticle">保存</span>
            <span>取消</span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import hljs from 'highlight.js'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend);

export default {
    name: 'Create',
    data () {
        return {
            content: '<p>请输入！</p>',
            editorOption: {
                modules: {
                    ImageExtend: {
                      loading: true,
                      name: 'foo',
                      action: 'http://120.79.214.223:3000/upload',
                      response: (res) => {
                          this.imgUrl = 'http://120.79.214.223:3000' + res.info;
                          return 'http://120.79.214.223:3000' + res.info
                      }
                  },
                  toolbar: {
                      container: [
                          ['bold', 'italic', 'underline', 'strike'],
                          ['blockquote', 'code-block'],
                          [{ 'header': 1 }, { 'header': 2 }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          [{ 'script': 'sub' }, { 'script': 'super' }],
                          [{ 'indent': '-1' }, { 'indent': '+1' }],
                          [{ 'direction': 'rtl' }],
                          [{ 'size': ['small', false, 'large', 'huge'] }],
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          [{ 'font': [] }],
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'align': [] }],
                          ['clean'],
                          ['link', 'image']
                      ],
                      handlers: {
                        'image': function () {  // 劫持原来的图片点击按钮事件
                            QuillWatch.emit(this.quill.id)
                        }
                      }
                  }
                },

            },
            artTitle: '',
            imgUrl: '',
        }
    },
    computed: {
         editor() {
           return this.$refs.myTextEditor.quill
         },
         contentCode() {
           return hljs.highlightAuto(this.content).value
         }
    },
    mounted() {
        console.log('this is current quill instance object', this.myQuillEditor)
    },
    methods: {
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        createArticle () {
            debugger
            axios.post("http://120.79.214.223:3000/create", qs.stringify({
              name: '小可爱',
              title: this.artTitle,
              content: this.content,
              img: this.imgUrl,
            })).then((data) => {
              console.log(data)
            //   console.log(data.data.data)
                if (data.data.msg && data.data.msg.status === 1) {
                    window.location.href = 'http://lemontea.xin/#/list/'+ data.data.msg._id;
                }
            });
        },
    },
}
</script>

<style lang="less">
    .create-article {
        min-width: 1280px;
        max-width: 1280px;
        margin: 40px auto;
        .creat-editor {
            // height: 800px;
            background-color: #fff;
            color: #333;
            p {
                color: #666;
            }
            .ql-container {
                height: 600px;
            }
        }
        .article-title {
            font-size: 14px;
            line-height: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #333;
            input {
                width: 300px;
                height: 30px;
                line-height: 30px;
                color: #333;
                padding-left: 10px;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
            }
        }

        .create-options {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 45px;
            span {
                display: block;
                width: 78px;
                height: 32px;
                font-size: 16px;
                line-height: 32px;
                text-align: center;
                border-radius: 4px;
                margin: 0 5px;
                color: #fff;
                background-color: #1890ff;
                border-color: #1890ff;
                text-shadow: 0 -1px 0 rgba(0,0,0,.12);
                -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.045);
                box-shadow: 0 2px 0 rgba(0,0,0,.045);
                cursor: pointer;
            }
        }
    }
</style>
