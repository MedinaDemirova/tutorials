const Course = require('../models/Course');

const create = async (data, userid) => {
    try {
        let isPublic = data.isPublic === "yes";
        const newData = await new Course({
            creator: userid,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            duration: data.duration,
            isPublic: isPublic
        });
        await newData.save();
        return;
    } catch (error) {
        throw error;
    }
};

const getOne = async (id) => {
    let data = await Course.findById(id).lean();
    return data;
};

const getAll = async (user) => {
    if (user) {
        let data = await Course.find({}).sort({ createdAt: 'desc' }).lean();

        data.forEach(one => {
            one.createdAt = one.createdAt.toUTCString();
        });
        return data;
    } else {
        let data = await Course.find({}).sort({ usersEnrolled: 'desc' }).lean();
        data = data.slice(0, 3);
        return data;
    }
};



const enroll = async (id, userid) => {
    let data = await Course.findById(id);
    data.usersEnrolled.push(userid);
    await data.save();
    return;
}

const deleteData = async (id) => {
    await Course.findByIdAndDelete(id);
    return;
}

const updateOne = async (_id, data) => {
    let isPublic = data.isPublic === "yes";
    await Course.updateOne({ _id }, {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        duration: data.duration,
        isPublic: isPublic
    });
    return 
}

module.exports = {
    create,
    getOne,
    getAll,
    enroll,
    deleteData,
    updateOne
}