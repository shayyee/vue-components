<template>
    <div>
        <header>
            <h1>目录</h1>
        </header>
        <main>
            <dl>
                <dt>PC端组件</dt>
                <dd><router-link to="/pc/pagination">Pagination</router-link></dd>
                <dt>MOBILE端组件</dt>
                <dd><router-link to="/mobile/switch">Switch</router-link></dd>
            </dl>
        </main>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'home'
}
</script>
