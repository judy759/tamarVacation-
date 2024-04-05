const Vacation = require("../modules/Vacation")
const User = require("../modules/User")
const userController = require("../controllers/userController")
const getAllVacation = async (req, res) => {

    const vacation = await Vacation.find({}, { password: 0 }).lean()
    if (!vacation) {
        return res.status(400).json({ message: "no vacation found" })
    }
    res.json(vacation)

}
const getVacationById = async (req, res) => {

    const { id } = req.params
    const vacation = await Vacation.findById(id, { password: 0 }).lean()
    if (!vacation) {
        return res.status(400).json({ message: "no vacation found 😒" })
    }
    res.json(vacation)
}
const createNewVacation = async (req, res) => {
    // const image=(req.files?.filename? req.file.filename:"")
    let images = []
    req.files.forEach(element => {
        images?.push(element.path)
    });

    console.log("lllllllllllllllllllllllll");
    console.log(req.files);
    const { name, startDate, endDate, active, price, location, registeredVactioners } = req.body
    if (!name) {
        return res.status(400).json({ message: 'name is required  💕' })
    }

    if (!endDate) {
        return res.status(400).json({ message: 'dateend is required  💕' })
    }


    if (!startDate) {
        return res.status(400).json({ message: 'datestart is required  💕' })
    }

    if (!price) {
        return res.status(400).json({ message: 'price is required  💕' })
    }

    if (!location) {
        return res.status(400).json({ message: 'location is required  💕' })
    }
    const vacation_check = await Vacation.find({ name }).lean()
    if (vacation_check?.length)
        return res.status(400).json({ message: 'There is the same vacationname' })
    // if(endDate.startDate)
    // {
    //     return res.status(400).json({message:'the date are not good!'})
    // }
    const vacation = await Vacation.create({ name, startDate, endDate, active, price, location, registeredVactioners, images })
    if (vacation) {
        return res.status(201).json({ message: "new vacation created" })
    }
    else {
        return res.status(400).json({ message: "no vacation found" })
    }

}
// const updateaddImages=async (req,res)=>{
//     const imgUrl=req.file?.path
//    const imgArr=req.file
//    const vacation = await Vacation.create({name,startDate,endDate,price,location,images:[...images,imgArr]})
//  vacation.images=vacation.images.push(image)
//    await vacation.save()
//    if(vacation){ 
//        return res.status(201).json({message:"we addd more images"})
//        }
//    else{
//        return res.status(400).json({message:"no vacation found"})
//    }

// }
const deleteVacation = async (req, res) => {

    const { _id } = req.body
    const vacation = await Vacation.findById(_id).exec()
    if (!vacation) {
        return res.status(400).json({ message: "no name found to delete" })
    }
    const userlist = await User.find({}, { password: 0 }).lean()
    if (!userlist) {
        return res.status(400).json({ message: "no userlist found" })
    }
    userlist.forEach(async (useri) => {
        await userController.globaldeleteShopingcart(useri._id, vacation)
    })
    const result = vacation;
    const result2 = await vacation.deleteOne()
    const reply = `Vacation_name ${result.name} ID ${result._id} deleted`
    res.json(reply)
}



const updateVacation = async (req, res) => {//*
    let images = []
    req.files?.forEach(element => {
        images?.push(element.path)
    });
    const { _id, name, startDate, endDate, active, price, location } = req.body
    if (!name) {
        return res.status(400).json({ message: 'name  is required iiiiiiiiiiiiiiiii 💕' })
    }

    try {
        // Find the vacation by name
        const vacationList = await Vacation.find({ name: name }).lean();

        if (vacationList.length === 0) {
            return res.status(404).json({ message: 'Vacation not found' });
        }

        // Extract ID from the found vacation
        const id = vacationList[0]._id;

        // Update the vacation by ID
        //תכלס לשנות......................
        //===============================================
        const updatedVacation = await Vacation.findByIdAndUpdate(
            id.toString(),
            { name, startDate, endDate, active, price, location, images },
            { new: true }
        );


        if (!updatedVacation) {
            return res.status(404).json({ message: 'Failed to update vacation' });
        }

        res.json({ message: 'Vacation updated successfully' });
    } catch (error) {
        console.error('Error updating vacation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const deleteImageFromImages = async (req, res) => {
    const { name } = req.body
    images = ['public\\uploads\\1710871910247-37-XAAB8025.JPG']
    if (!name) {
        return res.status(400).json({ message: 'name  is required iiiiiiiiiiiiiiiii 💕' })
    }
    try {
        const vacationList = await Vacation.find({ name: name }).lean();

        if (vacationList.length === 0) {
            return res.status(404).json({ message: 'Vacation not found' });
        }
        const id = vacationList[0]._id;
        const updatedVacation = await Vacation.findByIdAndUpdate(
            id.toString(),
            { images },
            { new: true }
        );


        if (!updatedVacation) {
            return res.status(404).json({ message: 'Failed to update vacation delete picture!' });
        }

        res.json({ message: 'Vacation updated successfully delete picture!' });
    } catch (error) {
        console.error('Error updating vacation delete picture!:', error);
        res.status(500).json({ message: 'Internal server error delete picture!' });
    }
}

const getFourNewVacations = async (req, res) => {

    //    const arr9=[];  
    //      try {
    //     const vacationlist = await Vacation.find({}, { password: 0 }).lean()
    //     if (!vacationlist) {
    //         return res.status(404).json({ message: 'no vacation to get...' });
    //     }
    //     // vacationlist.forEach(async (vacation) => {
    //     //   date=vacation.endDate
    //     //   console.log("date",date);
    //     // })





    //         res.json({ message: 'Vacation updated successfully geFourNewVacations' });
    //     } catch (error) {
    //         console.error('Error updating vacation geFourNewVacations', error);
    //        res.status(500).json({ message: 'Internal server error geFourNewVacations' });
    //     }
}
const one = async (req, res) => {
    const arr9 = [];
    try {
        const vacationlist = await Vacation.find({}, { password: 0 }).lean()
        if (!vacationlist) {
            return res.status(404).json({ message: 'no vacation to get..99999.' });
        }
        vacationlist.sort((vacation) => {
            vacation.startDate
        })
        // console.log("vacationlist", vacationlist);
        if (vacationlist.length > 9 || vacationlist.length === 9) {
            // console.log("length more than 9");
            //אני רצה ומכניסה לכל נופש מ-9 הנופשים את
            for (let index = vacationlist.length; index > vacationlist.length - 9; index--) {

                images_arr9 = await vacationlist[index].images
                // console.log("images loop >=9", images_arr9);
                if (images_arr9.length > 0) {
                    arrNames.push(vacationlist[index].name);
                    arr9.push(images_arr9[0]);

                }
            }
        }
        else if (vacationlist.length > 0) {
            // console.log("length less than 9", vacationlist.length);

            for (let index = vacationlist.length; index > 0; index--) {
                // console.log("less than 9 index", index - 1,"   ", vacationlist[index-1].name);
                if (index - 1 == 0) {
                    // console.log("index==0 <9");
                    const i = 9 - arr9.length;
                    // console.log("i", i);
                    images_arr9 = await vacationlist[index - 1].images
                    // console.log("images_arr9", images_arr9);
                    if (images_arr9.length < i) {
                        for (let index3 = 0; index3 < images_arr9.length; index3++) {
                            arr9.push({ image: images_arr9[index3], name: vacationlist[0].name });
                        }
                        count=i-images_arr9.length;
                      images_arr8 = await vacationlist[index ].images
                    //   console.log("count..",count);
                      if(images_arr8.length>count ||images_arr8.length===count)
                      {
                        // console.log("good in count...",images_arr8.length);
                        for (let inde = 0; inde < count; inde++) {
                            // console.log("i enter..");
                            arr9.push({ image: images_arr8[inde], name: vacationlist[index ].name });
                        }
                      }
                      else {
                        // console.log(" not good in count...",images_arr8.length);
                        
                        for (let index1 = 0; index1 < images_arr8.length; index1++) {
                            const element = images_arr8[index1];
                            arr9.push({ image: element, name: vacationlist[index ].name });
                            
                        }
                        count=count-images_arr8.length
                        if (vacationlist.length>2)
                        {
                            images_arr8 = await vacationlist[index+1 ].images
                            for (let index2= 0; index2<count; index2++) {
                           
                                arr9.push({ image: images_arr8[index2], name:  vacationlist[index+1 ].name});
                            }
                                // console.log("count 👍😁😁💕",count);
                        }
                        
                      

                      }
                    }
                    else {
                        for (let ind = 0; ind < i; ind++) {
                            arr9.push({ image: images_arr9[ind], name: vacationlist[index - 1].name });
                        }

                    }

                }

                else {
                    images_arr9 = await vacationlist[index - 1].images
                    // console.log("images loop >0", images_arr9)
                    if (images_arr9.length > 0) {
                        arr9.push({ image: images_arr9[0], name: vacationlist[index - 1].name })

                    }
                }

            }
        }
        res.json({ message: 'Vacation updated successfully 99999', data: { arr9 ,len:arr9.length} });
    }
    catch (error) {
        console.error('Error updating vacation 999999', error);
        res.status(500).json({ message: 'Internal server error 99999' });
    }

}
//updateaddImages
module.exports = { getAllVacation, getVacationById, deleteImageFromImages, createNewVacation, deleteVacation, updateVacation, getFourNewVacations, one }