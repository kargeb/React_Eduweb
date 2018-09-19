
// << 1 >> 
const Draggable = (props) => {

	function onDragStart(e){
// << 6 >>
		if(props.image){
			let img = new Image();
			img.src = props.image;
			e.dataTransfer.setDragImage(img,10,10)
		}

		e.dataTransfer.setData("application/x-edukursy-kurs", props.data.id)
	}

	return <div draggable="true" onDragStart={onDragStart}>{ props.children} </div>
}

const Droppable = (props) => {

	function onDragOver(e){
		e.preventDefault()
	}
	// << 3 >>
	function onDrop(e){
		// console.log( e.dataTransfer.getData("application/x-edukursy-kurs") )
		let data = e.dataTransfer.getData("application/x-edukursy-kurs");
		props.onDrop(data, e)
	}

	return <div onDragOver={onDragOver} onDrop={onDrop}>{ props.children} </div>
}
