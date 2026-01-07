import toast from "react-hot-toast";
import SweetToast from "../components/ui/SweetToast";

/**
 * Global toast controller
 * One toast per ID – always replaced, never stacked
 */
export const showToast = ({
  id,
  title,
  description,
  variant = "success",
  duration = 2000
}) => {
  if (!id) {
    console.warn("showToast called without id");
  }

  // 🔥 HARD REPLACE (fixes spam forever)
  toast.dismiss(id);

  toast.custom(
    (t) => (
      <SweetToast
        t={t}
        title={title}
        description={description}
        variant={variant}
      />
    ),
    {
      id,
      duration
    }
  );
};
