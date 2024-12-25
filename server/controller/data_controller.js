const { read_file, write_file } = require("../api/api");
const { v4 } = require('uuid');

const getData = async (req,res) => {
  try {
    const data = read_file("todos.json")
    res.json(data)
  } catch (error) {
    res.send(500).send(error.message)
  }
}

const addData = async (req,res) => {
  try {
    const data = read_file("todos.json")

    data.push({
      id: v4(),
      ...req.body
    })

    write_file("todos.json", data)
    
    res.send({
      message: "added successfuly"
    })
  } catch (error) {
    res.send(500).send(error.message)
  }
}

const deleteData = async (req,res) => {
  try {
    const {id} = req.params
    const data = read_file("todos.json")

    data.find((item,index) => {
      if (item.id === id) {
        data.splice(index,1)
      }
    });

    write_file("todos.json", data)
    
    res.send({
      message: "deleted successfuly"
    })
  } catch (error) {
    res.send(500).send(error.message)
  }
}

const updateData = async (req,res) => {
  try {
    const {id} = req.params
    const {author,todo} = req.body
    const data = read_file("todos.json")

    data.forEach((item,index) => {
      if (item.id === id) {
        item.author = author ? author : item.author
        item.todo = todo ? todo : item.todo
      }
    });

    write_file("todos.json", data)
    
    res.send({
      message: "updated successfuly"
    })
  } catch (error) {
    res.send(500).send(error.message)
  }
}



module.exports = {
  getData,
  addData,
  deleteData,
  updateData
}