<script setup>
  function onHelloWorld() {
    window.Word.run(async ctx => {
      const curr_doc_body = ctx.document.body;
      curr_doc_body.insertText('Hello, world!', window.Word.InsertLocation.start);
      await ctx.sync();
    });
  }
</script>

<template>
  <div id="app">
    <div class="content">
      <div class="content-header">
        <div class="padding">
          <h1>Welcome</h1>
        </div>
      </div>
      <div class="content-main">
        <div class="padding">
          <p>
            Hello, world!
          </p>
          <br />
          <h3>Try it out</h3>
          <button @click="onHelloWorld">Click</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content-header {
    background: #2a8dd4;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    overflow: hidden;
  }

  .content-main {
    background: #fff;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .padding {
    padding: 15px;
  }
</style>