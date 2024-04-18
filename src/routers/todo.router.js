const express = require('express');
const router = express.Router();
const todo = require('../models/todo.models');
const authentication = require('../utils/cookieChecker');

router.post('/addtodo' , async(req,res) => {
  try {
    
    const userData = req.body.userData;
    delete req.body.userData;
    const todoData = req.body;
    todoData.user = userData._id;

    
    const newTodo = new todo(todoData);
    const response = await newTodo.save();

    const allTodo = await todo.find({user : userData._id});

    return res.status(200).json(allTodo);

    // return res.status(200).json(response);
  } catch (error) {
    console.log('error is present in adding todo',error);
    res.status(500).json('internal server error');
  }
  
});

router.post('/alltodo' , async(req,res) => {
  try{
    const userData = req.body;
    const response = await todo.find({user : userData._id});

    return res.status(200).json(response);
  } catch(error){
    console.log('error is present in alltodo',error);
    return res.status(500).json('Internal server error');
  }
});

router.put('/updatetodo/:todoId' , async(req,res) => {
  try {
    const todoId = req.params.todoId;
    const userData = req.body._id;;
    delete req.body._id;
    const updatedData = req.body;
    const response = await todo.findByIdAndUpdate(todoId,updatedData,{
      new:true,
      runValidators:true,
    });
    // const userData = req.body.userData;
    const remainingData = await todo.find({user : userData});
    console.log(remainingData , 'rem');
    return res.status(200).json(remainingData);
    
  } catch (error) {
    console.log('error is present in updating todo',error);
    return res.status(500).json('Internal server error');
  }
});

router.put('/deletetodo/:todoId' , async(req,res) => {
  try {
    const todoId = req.params.todoId;
    const deleteData = await todo.findByIdAndDelete(todoId);
    const userData = req.body;

    const remainingData = await todo.find({user : userData._id});
    return res.status(200).json(remainingData);
  } catch (error) {
    console.log('error is present in deleting todo',error);
    return res.status(500).json('Internal server error');
  }
});

module.exports = router;