<template>
    <section class='container'>
        <client-only>
            <quill-editor  class='editor' v-model="content" 
            ref="quillEditor"
            :options="editorOption" />
        </client-only>
        
    </section>
</template>

<script>
export default {
        name: 'quill-example-nuxt',
        data () {
            return {
                content: '',
                editorOption: {
                // Some Quill options...
                theme: 'bubble',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, 'bold', 'blockquote', { 'color': [] }, { 'background': [] }, { 'align': [] }]
                    ]
                }
                }
            }
        },

        watch:{
            content(){
                this.$emit("content", this.content)
            }
        },
   
        

        
    }
</script>

<style lang="scss" scoped>

    .container {
        width: 100%;
        margin: 0 auto;
        padding: 50px 0;
        .quill-editor {
        min-height: 200px;
        max-height: 600px;
        overflow-y: auto;
        }
    }

    .editor {
    padding: 2px;
    margin: 3px 0;
    box-sizing: border-box;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    border: 2px solid #ccc; border-radius: 5px;
    outline: none;
    }
    .editor:hover {
        border: 2px solid #455a64; border-radius: 5px;
        background: white;
    }
</style>