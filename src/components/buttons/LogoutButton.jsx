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
      <Button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-red-500 hover:bg-red-50/70 rounded-xl transition-all duration-150 tracking-[-0.1px] bg-transparent">
        <HiOutlineLogout className="text-[13px] shrink-0" />
        Sign Out
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[400px]">
            <Modal.CloseTrigger onClick={() => setDropdownOpen(false)} />

            <Modal.Body>
              <div className="flex flex-col items-center text-center px-2 pt-6 pb-2 gap-4">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <HiOutlineLogout className="text-red-400 text-[28px]" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[17px] font-semibold text-black tracking-[-0.03em]">
                    Sign out of IdeaFlow?
                  </h2>
                  <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] leading-relaxed max-w-[260px]">
                    You can always sign back in at any time to access your ideas
                    and interactions.
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div className="flex flex-col gap-2 w-full px-2 pb-2">
                {/* Sign out — red */}
                <Button
                  onClick={logout}
                  className="w-full text-[13px] font-normal text-white bg-red-500 hover:bg-red-600 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                  slot="close"
                >
                  Sign out
                </Button>

                {/* Cancel */}
                <Button
                  onClick={() => setDropdownOpen(false)}
                  variant="secondary"
                  className="w-full text-[13px] font-normal text-black/60 hover:text-black bg-[#f0f2f5] hover:bg-black/[0.07] border-none py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
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
