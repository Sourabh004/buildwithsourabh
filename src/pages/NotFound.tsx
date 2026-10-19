import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NotFoundScene, SceneSlot } from "@/components/three/SceneSlot";
import CustomCursor from "@/components/CustomCursor";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <CustomCursor />
      <SceneSlot className="h-[360px] w-full max-w-3xl md:h-[440px]">{(active) => <NotFoundScene active={active} />}</SceneSlot>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="font-display text-3xl uppercase md:text-5xl">
          Wrong level<span className="text-primary">.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          <code className="rounded border-2 border-foreground bg-card px-1.5 py-0.5 text-xs">{pathname}</code> doesn't exist. Spin
          the shapes, then head back.
        </p>
        <Link to="/" className="btn-brutal mt-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
