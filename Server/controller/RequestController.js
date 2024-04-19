const RequestBlood = require("../model/bloodRequest");


exports.createRequest = async (req, res) => {
    try {
        const {
            fullName,
            email,
            mobileNo,
            gender,
            age,
            bloodGroup,
            quantity,
            reason,
            time,
            address,
            district,
            pincode,
            reqPersonAddhar,
            submittedBy,
        } = req.body;

        const request = new RequestBlood({
            fullName,
            email,
            mobileNo,
            gender,
            age,
            bloodGroup,
            quantity,
            reason,
            time,
            address,
            district,
            pincode,
            reqPersonAddhar,
            submittedBy,
        });

        request.save();

        res.status(200).json({
            message: "Request created successfully",
            request,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating request",
            error,
        });
    }
};


//get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await RequestBlood.find();

        res.status(200).json({
            success: true,
            requests,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting requests",
            error,
        });
    }
};

//get request by id
exports.getRequestById = async (req, res) => {
    try {
        const id = req.params.id
        const request = await RequestBlood.findById(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request data not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Blood request data retrieved successfully",
            request,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting request",
            error,
        });

    }
};

//  update request
exports.updateRequest = async (req, res) => {
    try {
        const id = req.params.id
        const request = await RequestBlood.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request data not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Blood request data updated successfully",
            request,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating request",
            error,
        });
    }
};

// delete request




