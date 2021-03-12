console.log("hello beautiful")
import { loadLegos, useLegos } from './legos/LegoData.js'
import { makeLegoList } from './legos/LegoList.js';

const navElement = document.querySelector("nav");

navElement.addEventListener("click", (event) => {
	if (event.target.id === "showRed") {
		filterLegos("Red")
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	} else if (event.target.id === "showGreen") {
		filterLegos("Green")
	}
})
navElement.addEventListener("change", (event) => {
	const material = document.querySelector("#marterialSelect").value;
	if (material === "NONE") {
		makeLegoList(useLegos())
	} else {
		legosByMaterial(material)
	}

})
const filterLegos = (whatFilter) => {
	const filterArray = useLegos().filter(singleLego => {
		if (singleLego.LegoName.includes(whatFilter)) {
			return singleLego;
		}
	})
	makeLegoList(filterArray);
}
const legosByMaterial = (whatMaterial) => {
	const materialArray = useLegos().filter(singleLego => {
		if (singleLego.Material === whatMaterial) {
			return singleLego;
		}
	})
	makeLegoList(materialArray);
}
const legosById = (whichId) => {
	const legoId = useLegos().filter(singleLego => {
		if (singleLego.LegoId === whichId) {
			return singleLego;
		}
	})
	if (legoId.length > 0) {
		makeLegoList(legoId)
	} else {
		document.getElementById("all-legos").innerHTML = `<h2> I can't find ${whichId} did we use it in the Eiffel Tower</h2>`
	}
}
const startEIA = () => {
	loadLegos()
		.then(legoArray => {
			makeLegoList(legoArray)
		})

}
navElement.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		if (event.target.id === "searchBar") {
			legosById(document.getElementById("searchBar").value)
		}

	}
})
startEIA();