const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try{
    const user = await User.findById(req.session.user._id)
    res.locals.pantry = user.pantry;
    res.render('foods/index.ejs')
    }catch (err){
    console.error(error.message);
    res.redirect('/')
    }
});

router.post('/', async (req,res)=>{
    try{
        const user = await User.findById(req.session.user._id)
        user.pantry.push(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/foods`) 
        } catch (err) {
        console.error('error adding to pantry', err);
        res.redirect('/')
        }
})

router.get('/new', (req, res) =>{
    res.render('foods/new.ejs')
})


router.delete('/:itemId', async (req,res) =>{
    try{
    const user = await User.findById(req.session.user._id)
    user.pantry.id(req.params.itemId).deleteOne()
    await user.save()
    res.redirect(`/users/${user.id}/foods`)
    } catch (err) {
    console.error('error deleting item', err);
    res.redirect('/')
    }
})

router.get('/:itemId/edit', async (req,res) => {
    try{
    const user = await User.findById(req.session.user._id)
    const currentItem = user.pantry.find((pantry) =>pantry.id ===req.params.itemId);
    res.locals.item = currentItem;
    res.render('./edit.ejs')
    } catch (err) {
    console.error('error editing item', err);
    res.redirect('/')
    }
})

router.put('/:itemId', async (req,res) =>{
    try{
    const user = await User.findById(req.session.user._id)
    const currentItem = user.pantry.find((pantry) =>pantry.id ===req.params.itemId);
    currentItem.set({name: req.body.name})
    await user.save()
    res.redirect(`/users/${user.id}/foods`)
    } catch (err) {
    console.error('error changing item', err);
    res.redirect('/')
    }
})






module.exports = router;
