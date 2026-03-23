const content = document.getElementById("content")
const shotTestDisplay = document.getElementById("shotsTest")
const shotSingleDisplay = document.getElementById("shotsSingle")
const shotRapid1Display = document.getElementById("shotsRapid1")
const shotRapid2Display = document.getElementById("shotsRapid2")
const totalDisplay = document.getElementById("total")
const dialog = document.querySelector("dialog")
const newValue = document.getElementById("newValue")
const closeBtn = document.querySelector(".close")

const date = new Date()

let shotCount = 0
let shots = []
let currentShotItem
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
            currentShotItem = shotItem
            newValue.value = Number(shotItem.innerText)
            dialog.showModal()
        })

        if(shotCount <= 11){
            shots.push(Number(num))
            if(shotCount < 2){
                if(document.getElementById("shotMockshotsTest")){
                    document.getElementById("shotMockshotsTest").style.display = "none"
                }
                shotTestDisplay.appendChild(shotItem)
                shotItem.innerText += ` ${num}`
                document.getElementById("shotsTest_p").innerHTML = `<strong>Probe: </strong>${shots.slice(0, 2).reduce((acc, curr) => Number(acc)+Number(curr), 0)}`
            } else if(shotCount > 1 && shotCount < 6){
                if(document.getElementById("shotMockshotsSingle")){
                    document.getElementById("shotMockshotsSingle").style.display = "none"
                }
                shotSingleDisplay.appendChild(shotItem)
                shotItem.innerText += ` ${num}`
                document.getElementById("shotsSingle_p").innerHTML = `<strong>Einzel: </strong>${shots.slice(2, 6).reduce((acc, curr) => Number(acc)+Number(curr), 0)}`
            } else if(shotCount > 5 && shotCount < 9){
                if(document.getElementById("shotMockshotsRapid1")){
                    document.getElementById("shotMockshotsRapid1").style.display = "none"
                }
                shotRapid1Display.appendChild(shotItem)
                shotItem.innerText += ` ${num}`
                document.getElementById("shotsRapid1_p").innerHTML = `<strong>Serie 1: </strong>${shots.slice(6, 9).reduce((acc, curr) => Number(acc)+Number(curr), 0)}`
            } else {
                if(document.getElementById("shotMockshotsRapid2")){
                    document.getElementById("shotMockshotsRapid2").style.display = "none"
                }
                shotRapid2Display.appendChild(shotItem)
                shotItem.innerText += ` ${num}`
                document.getElementById("shotsRapid2_p").innerHTML = `<strong>Serie 2: </strong>${shots.slice(9, 12).reduce((acc, curr) => Number(acc)+Number(curr), 0)}`
            }
        localStorage.setItem("shotCounter", JSON.stringify({"shots": shots, "shotCount": shotCount}))
        }
        totalDisplay.innerText = shots.slice(2).reduce((acc, curr) => Number(acc)+Number(curr), 0)
        shotCount++



    })
}

closeBtn.addEventListener("click", () => {
    if(Number.isInteger(Number(newValue.value)) && Number(newValue.value) >= 0 && Number(newValue.value) <= 10){
        shots[Number(currentShotItem.id.split("_")[1])] = Number(newValue.value)
        currentShotItem.innerText = newValue.value
        document.getElementById("shotsTest_p").innerHTML = `Probe: <strong>${shots.slice(0, 2).reduce((acc, curr) => Number(acc)+Number(curr), 0)}</strong>`
        document.getElementById("shotsSingle_p").innerHTML = `Einzel: <strong>${shots.slice(2, 6).reduce((acc, curr) => Number(acc)+Number(curr), 0)}</strong>`
        document.getElementById("shotsRapid1_p").innerHTML = `Serie 1: <strong>${shots.slice(6, 9).reduce((acc, curr) => Number(acc)+Number(curr), 0)}</strong>`
        document.getElementById("shotsRapid2_p").innerHTML = `Serie 2: <strong>${shots.slice(9, 12).reduce((acc, curr) => Number(acc)+Number(curr), 0)}</strong>`
        totalDisplay.innerText = shots.slice(2).reduce((acc, curr) => Number(acc)+Number(curr), 0)
        dialog.close()
        return
    }
    alert("Nur ganze Zahlen von 0 bis 10 akzeptiert")
        return
});

document.getElementById("reset").addEventListener("click", function(){
    if (window.confirm("Wirklich zurücksetzen? Alle Schüsse werden gelöscht!")) {
        shotCount = 0
        shots = []
        const firedShots = document.querySelectorAll(".shot")
        firedShots.forEach(shot => {
            shot.remove()
        })
        const mocks = document.querySelectorAll(".shotMock")
        mocks.forEach(mock => {
            mock.style.display = "flex"
        })
        totalDisplay.innerText = ""
        document.getElementById("shotsTest_p").innerHTML = `Probe: `
        document.getElementById("shotsSingle_p").innerHTML = `Einzel: `
        document.getElementById("shotsRapid1_p").innerHTML = `Serie 1: `
        document.getElementById("shotsRapid2_p").innerHTML = `Serie 2: `
    }
})

document.querySelector("footer").innerText = `Copyright ${date.getFullYear()} Pistolenclub Hallau`
