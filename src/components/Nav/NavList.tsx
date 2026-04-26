import { DotIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjectContext } from "@contexts/ProjectContext";
import { motion } from "framer-motion";
import Routes from "../../routes";

export default function NavList() {
  const location = useLocation();
  const { routes } = Routes();
  const navigate = useNavigate();
  const { projectVisible, setProjectState } = useProjectContext();

  return (
    <div className="nav-list">
      {routes.map((item, i) => (
        <motion.div
          className="nav-item"
          key={item.name}
          animate={{ opacity: location.pathname === item.path ? 1 : 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => {
            if (projectVisible) setProjectState({ projectVisible: false });
            navigate(item.path);
          }}
        >
          {item.name}
          {routes.length - 1 !== i && (
            <DotIcon color="var(--text-color)" width="10px" height="10px" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
