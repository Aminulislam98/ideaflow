"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Modal } from "@heroui/react";
import { HiOutlineLogout } from "react-icons/hi";

export function LogoutModal({ setDropdownOpen }) {
  const logout = () => {
    authClient.signOut();
    setDropdownOpen(false);
  };

  return (
    <Modal>
      {/* Trigger Button adaptive states */}
      <Button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-150 tracking-[-0.1px] bg-transparent">
        <HiOutlineLogout className="text-[13px] shrink-0" />
        Sign Out
      </Button>

      {/* Premium Backdrop blur wrapper */}
      <Modal.Backdrop className="bg-black/40 dark:bg-black/60 backdrop-blur-md">
        <Modal.Container>
          {/* Main Dialog Box optimized to switch layouts gracefully */}
          <Modal.Dialog className="sm:max-w-[400px] bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <Modal.CloseTrigger
              className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors duration-150"
              onClick={() => setDropdownOpen(false)}
            />

            <Modal.Body>
              <div className="flex flex-col items-center text-center px-2 pt-6 pb-2 gap-4">
                {/* Adaptive Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
                  <HiOutlineLogout className="text-red-500 dark:text-red-400 text-[28px]" />
                </div>

                {/* Adaptive Typography Layers */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[17px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                    Sign out of IdeaFlow?
                  </h2>
                  <p className="text-[13px] font-normal text-black/50 dark:text-zinc-400 tracking-[-0.1px] leading-relaxed max-w-[260px]">
                    You can always sign back in at any time to access your ideas
                    and interactions.
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div className="flex flex-col gap-2 w-full px-2 pb-2">
                {/* Sign out Button (Vibrant red theme works nicely on both backdrops) */}
                <Button
                  onClick={logout}
                  className="w-full text-[13px] font-medium text-white bg-red-500 hover:bg-red-600 active:scale-[0.98] py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                  slot="close"
                >
                  Sign out
                </Button>

                {/* Adaptive Cancel Button */}
                <Button
                  onClick={() => setDropdownOpen(false)}
                  variant="secondary"
                  className="w-full text-[13px] font-normal text-black/60 hover:text-black dark:text-zinc-300 dark:hover:text-white bg-[#f0f2f5] hover:bg-black/[0.07] dark:bg-zinc-800 dark:hover:bg-zinc-700/80 active:scale-[0.98] border border-transparent dark:border-white/[0.04] py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                  slot="close"
                >
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
