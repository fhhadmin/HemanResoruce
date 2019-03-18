<template>
  <div>
    <Row>
      <Col span="24">
        <quillEditor v-model="content"
                     ref="myQuillEditor"
                     :options="editorOption"
                     @blur="onEditorBlur($event)"
                     @focus="onEditorFocus($event)"
                     @ready="onEditorReady($event)"
                     @change="onEditorChange($event)">
        </quillEditor>
      </Col>
    </Row>
    <div style="margin-top: 10px" v-if="hideButton">
      <Button v-if="cMod === 'add'" size="large" @click="send" type="success">发布</Button>
      <Button v-if="cMod === 'edit'" size="large" @click="edit" type="success">保存编辑</Button>
    </div>
    <Modal v-model="showQiniu" width="510" :transfer="false">
      <div style="text-align: center">
        <qiniu-img :imgShow="false" v-model="imgUrlString" @succeedOk="onImage">
          上传图片
        </qiniu-img>
      </div>
    </Modal>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import QiniuImg from '_c/uploadMultiple'

export default {
  components: {
    quillEditor,
    QiniuImg
  },
  props: {
    cMod: {
      type: String,
      default: 'add'
    },
    // 回显内容
    editorContent: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 562
    },
    hideButton:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      },
      // 图片上传
      showQiniu: false,
      content: '',
      imgValue: '',
      imgUrlString: ''
    }
  },
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
      // console.log(this.content);
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.imgUrlString = []
      this.showQiniu = true
      this.range = this.$refs.myQuillEditor.quill.getSelection()
    },
    // 发布
    send: function () {
      this.$emit('complete', this.content)
    },
    edit: function () {
      this.$emit('edit', this.content)
    },
    steImg (url) {
      console.log(url)
      this.$refs.myQuillEditor.quill.insertEmbed(this.range.index, 'image', url)
      this.showQiniu = false
    },
    onImage (url) {
      if (url.includes(',')) {
        this.steImg(this.addImgBase(url.split(',')[url.split(',').length - 1]))
      } else {
        this.steImg(this.addImgBase(url))
      }
    }
  },
  mounted () {
    this.content = this.editorContent
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
    // 设置编辑器高度
    this.editor.container.style.height = `${this.height}px`
    this.editor.container.firstChild.style.height = `${this.height}px`
    // console.log(this.$refs.myQuillEditor)
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    inputValue (value) {
      this.content = value
    }
  },
  watch: {
    'editorContent': function (e) {
      this.content = e
    }
  }
}
</script>
<style>
  @import "./editor.css";
</style>
