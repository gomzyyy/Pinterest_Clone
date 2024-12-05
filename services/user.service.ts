import { getUserProfile } from "@/Store/Thunk/userThunk";
import { ExpoRouter } from "expo-router/build/types";
import { useRouter } from "expo-router";
import { AppDispatch } from "@/Store/store";
import { useDispatch } from "react-redux";

const dispatch = useDispatch<AppDispatch>();
const router = useRouter();

export const redirectToUserProfile = async (token: string, adminId: string) => {
  try {
    if (!token) {
      router.replace("/components/GetStarted/GetStarted");
      return;
    }
    const userId = adminId.trim();
    const data = {
      token,
      userId,
    };
    const res = await dispatch(getUserProfile(data)).unwrap();
    if (res.success) {
      router.push("/components/User/userProfile");
      return;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
