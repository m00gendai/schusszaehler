const content = document.getElementById("content")
const shotTestDisplay = document.getElementById("shotsTest")
const shotSingleDisplay = document.getElementById("shotsSingle")
const shotRapid1Display = document.getElementById("shotsRapid1")
const shotRapid2Display = document.getElementById("shotsRapid2")
const totalDisplay = document.getElementById("total")
let shotCount = 0
let shots = []
const arr =[0,1,2,3,4,5,6,7,8,9,10]

for(const num of arr){
  const div = document.createElement("div")
  content.appendChild(div)
  div.innerText = num
  div.setAttribute("class", "number")

  div.addEventListener("click", function(){
    const shotItem = document.createElement("div")
    shotItem.setAttribute("class", "shot")
    shotItem.setAttribute("id", `shotItem_${shotCount}`)
    shotItem.addEventListener("click", function(){
      const newValue = prompt("change value", num)
      shots[Number(shotItem.id.split("_")[1])] = Number(newValue)
      shotItem.innerText = newValue
      totalDisplay.innerText = shots.slice(2).reduce((acc, curr) => Number(acc)+Number(curr), 0)
    })
    if(shotCount <= 11){
      if(shotCount < 2){
        shotTestDisplay.appendChild(shotItem)
        shotItem.innerText += ` ${num}`
      } else if(shotCount > 1 && shotCount < 6){
        shotSingleDisplay.appendChild(shotItem)
        shotItem.innerText += ` ${num}`
      } else if(shotCount > 5 && shotCount < 9){
        shotRapid1Display.appendChild(shotItem)
        shotItem.innerText += ` ${num}`
      } else {
        shotRapid2Display.appendChild(shotItem)
        shotItem.innerText += ` ${num}`
      }
        shots.push(Number(num))
      shotCount++
      totalDisplay.innerText = shots.slice(2).reduce((acc, curr) => Number(acc)+Number(curr), 0)
    }
  })
}
