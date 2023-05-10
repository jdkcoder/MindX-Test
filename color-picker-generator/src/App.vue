<script setup>
import { ref, watch } from "vue";
const currentClr = ref();
const isGenerated = ref(false);
function randomClr() {
  if (!gradientMode.value) currentClr.value = randomHex()
  else currentClr.value = randomGradient()

  document.body.style.background = currentClr.value;
}

function randomHex() {
  isGenerated.value = true;
  /*
  r-g-b follow 8-bit color, their integer values are from 0 to 2551
  => Colors can be create: 256(R)x256(G)×256(B) = 16,777,216
  */
  return "#" + Math.floor(Math.random() * 16777216).toString(16)
}

function randomGradient() {
  const randomDeg = (Math.random() * 360).toFixed(2);
  degree.value = randomDeg;

  do {
    leftPercent.value = Math.floor(Math.random() * 49) + 1; // Generate a random number between 1 and 49 for the left side

    rightPercent.value = 100 - leftPercent.value; // Calculate the percentage for the right side
  } while (leftPercent.value == !40 || rightPercent.value == !40 || leftPercent.value + rightPercent.value !== 100);

  leftClr.value = randomHex()
  rightClr.value = randomHex()
  const gradient = `linear-gradient(${degree.value}deg, ${leftClr.value} ${leftPercent.value}%, ${rightClr.value} ${rightPercent.value}%)`;
  return gradient
}

function copy() {
  navigator.clipboard.writeText(currentClr.value)
    .then(() => {
      alert(`Copied "${currentClr.value}" to clipboard`);
    })
    .catch((err) => {
      alert('Lỗi, Hãy thử copy thủ công')
      console.error(`Failed to copy text: ${err}`);
    });
}

const gradientMode = ref(false)
const leftClr = ref()
const rightClr = ref()
const leftPercent = ref()
const rightPercent = ref()
const degree = ref()

function changeDegree(value) {
  if (value.length < 1) value = 0
  else value = Number(value)

  currentClr.value = `linear-gradient(${value}deg, ${leftClr.value} ${leftPercent.value}%, ${rightClr.value} ${value}%)`;
  document.body.style.background = currentClr.value;
}
function changeLeftClr(e) {
  leftClr.value = e.target.value
  currentClr.value = `linear-gradient(${degree.value}deg, ${leftClr.value} ${leftPercent.value}%, ${rightClr.value} ${rightPercent.value}%)`;
  document.body.style.background = currentClr.value;

}
function changeLeftPercent(value) {
  if (value.length < 1) value = 0
  else value = Number(value)

  currentClr.value = `linear-gradient(${degree.value}deg, ${leftClr.value} ${value}%, ${rightClr.value} ${rightPercent.value}%)`;
  document.body.style.background = currentClr.value;
}
function changeRightClr(e) {
  rightClr.value = e.target.value
  currentClr.value = `linear-gradient(${degree.value}deg, ${leftClr.value} ${leftPercent.value}%, ${rightClr.value} ${rightPercent.value}%)`;
  document.body.style.background = currentClr.value;

}
function changeRightPercent(value) {
  if (value.length < 1) value = 0
  else value = Number(value)

  currentClr.value = `linear-gradient(${degree.value}deg, ${leftClr.value} ${leftPercent.value}%, ${rightClr.value} ${value}%)`;
  document.body.style.background = currentClr.value;
}

watch(gradientMode, () => {
  document.body.style.background = '#242424';
  isGenerated.value = false
})

</script>

<template>
  <div id="wrapper">
    <div>
      <input type="checkbox" id="mode" v-model="gradientMode" :value="!gradientMode" />
      <label for="mode" :class="{ 'non-active': !gradientMode }">Gradient Mode: {{ gradientMode ? 'ON' : 'OFF' }}</label>
    </div>
    <button @click="randomClr()">Random {{ gradientMode ? 'Gradient w/ 2 Colors' : 'Hex' }}</button>


    <div class="current">
      <p @click="copy" v-if='isGenerated' id="hex-code">{{ currentClr }}</p>

      <div id="specs" v-if='gradientMode && isGenerated'>
        <p>Specs:</p>
        <div id="specs-grid">
          <div class="input degree">
            <span>Degree:</span>
            <input type="number" id="degree" v-model="degree" @input="changeDegree(degree)" />
          </div>
          <div class="input">
            <span>Left color:</span>
            <input type="color" id="leftClr" :value="'#' + leftClr" @change="changeLeftClr($event)" />
          </div>
          <div class="input">
            <span>Right color:</span>
            <input type="color" id="rightClr" :value="'#' + rightClr" @change="changeRightClr($event)" />
          </div>
          <div class="input">
            <span>% Left color:</span>
            <input type="number" id="leftPercent" v-model="leftPercent" @input="changeLeftPercent(leftPercent)" />
          </div>
          <div class="input">
            <span>% right color:</span>
            <input type="number" id="rightPercent" v-model="rightPercent" @input="changeRightPercent(rightPercent)" />
          </div>
        </div>
      </div>
      <i v-if='currentClr && isGenerated'>Click on {{ gradientMode ? 'gradient code' : 'hex code' }} to copy</i>
    </div>
  </div>
</template>

<style lang="sass">
#wrapper
  position: absolute
  top: 30%
  left: 50%
  transform: translateX(-50%)
  display: grid
  grid-auto-columns: 18rem
  gap: 1.5rem

.current
  position: absolute
  bottom: 0
  left: 50%
  white-space: nowrap
  transform: translate(-50%, calc(100% + 2rem))

  p 
    font-size: 1.5rem
    font-weight: 600
    margin: 0
    padding: 0
    margin-bottom: .5rem

  i
    color: #fff
    background: #242424
    font-weight: 500
    padding: .25rem .75rem
    border-radius: 3px
  
#specs
  display: grid
  place-items: center

#specs-grid
  display: grid
  grid-template-columns: repeat(2, max-content)
  margin-bottom: 2rem
  gap: 1rem 2rem

  .input
    display: grid
    grid-template-columns: 7rem 1fr
    justify-content: center


    input:not([type="color"])
      width: 5rem
      padding: .25rem .375rem

    input[type="color"]
      width: 6rem
      padding: .125rem .5rem

  .input.degree
    grid-column: 1 / 3
    display: flex
    align-items: center
    justify-content: center
    
    & > * + *
      margin-left: 1rem

label[for="mode"]
  background: transparent
  font-weight: 600
  padding: 1px .25rem
  border-radius: 4px
  user-select: none
  cursor: pointer
  position: relative

  &.non-active
    background: linear-gradient(-323.63deg, #a1199d 13%, #970efa 87%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

    &::after 
        --s: calc(100% + .25rem)
        content: ""
        position: absolute
        top:0 
        left: 0
        z-index: -1
        height: var(--s)
        width: var(--s)
        background: #242424
        border-radius: 3px

</style>