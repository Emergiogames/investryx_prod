import React, { useEffect, useState } from "react";
import { getPreference, setPreference } from "../../../services/user/apiMethods";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

function ManagePref({ user }) {
    const [pref, setPref] = useState(null); // Use null initially to check if data exists
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        getPreference()
            .then((response) => {
                if (response.status === 200) {
                    setPref(response.data);
                }
            })
            .catch((error) => {
                console.error("Error occurred", error);
            });
    }, []);
    const TABLE_ROWS = pref
        ? [
              { key: "Profile", value: pref.profile || "N/A" },
              {
                  key: "Interested City",
                  value:
                      Array.isArray(pref.interested_city) && pref.interested_city.length > 0
                          ? pref.interested_city[0].length > 10
                              ? `${pref.interested_city[0].slice(0, 10)}...`
                              : pref.interested_city[0]
                          : "N/A",
              },
              {
                  key: "Interested State",
                  value:
                      Array.isArray(pref.interested_state) && pref.interested_state.length > 0
                          ? pref.interested_state[0].length > 10
                              ? `${pref.interested_state[0].slice(0, 10)}...`
                              : pref.interested_state[0]
                          : "N/A",
              },
              { key: "Investment Interest", value: pref.investment_interest || "N/A" },
              { key: "Investment Horizon", value: pref.investment_horizon || "N/A" },
              { key: "Frequency", value: pref.frequency || "N/A" },
          ]
        : [];

    return (
        <div className="bg-amber-100 rounded-lg mx-6">
            <div className="p-7">
                <div className="mb-5 text-3xl font-medium font-sans text-violet-900 flex justify-center">Preferences</div>

                <div>
                    <Card className="h-full w-full px-6 bg-amber-50">
                        <table className="w-full min-w-max table-auto text-left ">
                            <tbody>
                                {TABLE_ROWS.length > 0 ? (
                                    TABLE_ROWS.map(({ key, value }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                                        return (
                                            <tr key={key} className="hover:bg-gray-50">
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {key}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" className="font-normal text-gray-600">
                                                        {value}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="text-center py-4">No preferences available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>

                {/* Manage Preferences Button */}
                <div className="flex flex-col items-center text-center mt-4">
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="p-4 m-4 w-full px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 md:min-w-64 rounded-lg shadow-md"
                    >
                        Manage Preferences
                    </button>
                    <div className="text-gray-600">*Update your preferences for better experience!</div>
                </div>

                {/* Popup Modal */}
                {isPopupOpen && (
                    <PreferencePopUp user={user} pref={pref} setPref={setPref} onClose={() => setIsPopupOpen(false)} />
                )}
            </div>
        </div>
    );
}

export default ManagePref;

//POPUP Part

const TABLE_HEAD = ["Parameters", "Preferences", ""];

export const PreferencePopUp = ({ user, pref, onClose }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openResultDialog, setOpenResultDialog] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [resultSuccess, setResultSuccess] = useState(false);

    // Convert pref into an array of key-value pairs
    const AllPrefData = pref
        ? [
              { key: "profile", label: "Profile", value: pref.profile || "N/A" },
              { key: "interested_city", label: "Interested City", value: pref.interested_city || "N/A" },
              { key: "interested_state", label: "Interested State", value: pref.interested_state || "N/A" },
              { key: "investment_interest", label: "Investment Interest", value: pref.investment_interest || "N/A" },
              { key: "investment_horizon", label: "Investment Horizon", value: pref.investment_horizon || "N/A" },
              { key: "frequency", label: "Frequency", value: pref.frequency || "N/A" },
              { key: "advisor_experience", label: "Advisor Experience", value: pref.advisor_experience || "N/A" },
              { key: "price_starting", label: "Range Starting", value: pref.price_starting || "N/A" },
              { key: "price_ending", label: "Range Ending", value: pref.price_ending || "N/A" },
          ]
        : [];

    // Check if data has changed
    useEffect(() => {
        setIsChanged(Object.keys(editedData).length > 0);
    }, [editedData]);

    // Handle input change
    const handleInputChange = (key, newValue) => {
        setEditedData((prev) => ({ ...prev, [key]: newValue }));
    };

    // Initial confirm dialog
    const handleSaveClick = () => {
        if (Object.keys(editedData).length === 0) {
            setResultMessage("No changes detected.");
            setResultSuccess(false);
            setOpenResultDialog(true);
            return;
        }
        setOpenConfirmDialog(true);
    };

    // Handle submit after confirmation
    const handleSubmit = async () => {
        setOpenConfirmDialog(false);

        try {
            const response = await setPreference(editedData, user?.id);
            console.log("pref return ", response);

            if (response.status >= 200 && response.status < 300 && response.data.status === true) {
                toast.success("Preferenve updated successfully");
                setResultMessage("Preferences updated successfully!");
                setResultSuccess(true);
                setEditIndex(null);
                setEditedData({});
            } else {
                toast.error("Preference update failed");
                setResultMessage("Failed to update preferences.");
                setResultSuccess(false);
            }
        } catch (error) {
            console.error("Error updating preferences:", error?.message);
            setResultMessage("Error updating preferences.");
            setResultSuccess(false);
        } finally {
            setOpenResultDialog(true);
        }
    };

    return (
        <>
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                {/* Centered Box with Scroll */}
                <div className="p-6 rounded-lg shadow-lg h-screen w-3/4 overflow-y-auto bg-white">
                    <div className="text-end">
                        <Button variant="filled" className="bg-amber-300 hover:bg-amber-500" onClick={onClose}>
                            X
                        </Button>
                    </div>
                    <Card className="">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-1 flex items-center justify-between gap-8">
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        Edit Preferences
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        See information about your current preferences.
                                    </Typography>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                <Typography variant="small" color="blue-gray" className="opacity-70">
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllPrefData.map(({ key, label, value }, index) => (
                                        <tr key={key} className="border-b border-blue-gray-50">
                                            {/* First Column: Parameter */}
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {label}
                                                </Typography>
                                            </td>

                                            {/* Second Column: Value (Editable) */}
                                            <td className="p-4">
                                                {editIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[key] ?? value}
                                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                                        className="border rounded-md p-2 w-full"
                                                    />
                                                ) : (
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {editedData[key] ?? value}
                                                    </Typography>
                                                )}
                                            </td>

                                            {/* Third Column: Edit Button */}
                                            <td className="p-4">
                                                <Tooltip content="Edit Preference">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => setEditIndex(editIndex === index ? null : index)}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex justify-end border-t border-blue-gray-50 p-4">
                            {isChanged && (
                                <Button variant="outlined" size="sm" onClick={handleSaveClick}>
                                    Save Changes
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Confirmation Dialog */}
            {/* <Dialog open={openConfirmDialog} handler={() => setOpenConfirmDialog(false)}>
                <DialogHeader>Confirm Changes</DialogHeader>
                <DialogBody>Are you sure you want to save the changes?</DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={() => setOpenConfirmDialog(false)} className="mr-1">
                        Cancel
                    </Button>
                    <Button variant="" color="green" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog> */}
            {openConfirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div
                        className="bg-white p-4 rounded-2xl"
                        open={openConfirmDialog}
                        handler={() => setOpenConfirmDialog(false)}
                    >
                        <DialogHeader>Confirm Changes</DialogHeader>
                        <DialogBody>Are you sure you want to save the changes?</DialogBody>
                        <DialogFooter>
                            <Button variant="text" color="red" onClick={() => setOpenConfirmDialog(false)} className="mr-1">
                                Cancel
                            </Button>
                            <Button variant="" color="green" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
                // <div className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-50 backdrop-blur-sm">
                //     <div className="bg-white w-[10rem] h-[10rem]">dfsdfsd</div>
                // </div>
            )}

            {/* Result Dialog */}
            <div open={openResultDialog} handler={() => setOpenResultDialog(false)}>
                <DialogHeader>{resultSuccess ? "Success" : "Notice"}</DialogHeader>
                <DialogBody>{resultMessage}</DialogBody>
                <DialogFooter>
                    <Button variant="" color={resultSuccess ? "green" : "blue"} onClick={() => setOpenResultDialog(false)}>
                        OK
                    </Button>
                </DialogFooter>
            </div>
        </>
    );
};
