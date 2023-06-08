<template>
    <div class="postcode-wrapper">
        <div ref="postarea"></div>
        
    </div>
</template>
<script>
export default {
    mounted() {
        console.log("[SHOULD NOT BE NULL]", this.$ref.postarea);
        new window.daum.Postcode({
            oncomplete: (data) => {
                this.$emit('address', data) //emit to parent 
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            //console.log('[주소]', data);
        }
    }).embed(this.$ref.postarea);
    }
}
</script>
<style>

</style>