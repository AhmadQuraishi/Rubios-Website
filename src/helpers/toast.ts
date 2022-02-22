import { toast } from "react-toastify";

interface settingsConfig {

    position?: string;
    autoClose?: number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    progress?: number | string;
    theme?: string;
}

enum toastType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO'
}

type toast = keyof typeof toastType;

const defaultSettings: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
}

export const displayToast = (type: toast, message: string, settings?: settingsConfig) => {

    const toastSettings: any =   {
        ...defaultSettings,
        ...settings
    }

    switch (type) {
        case toastType.SUCCESS:
            toast.success(message, toastSettings);
         break;
        case toastType.ERROR:
            toast.error(message, toastSettings);
         break;
        case toastType.INFO:
            toast.info(message, toastSettings);
         break;
        default:
            break;
    }
};

