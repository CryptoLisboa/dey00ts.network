import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function SignUpCard({
    children,
    onClickNext,
}: {
    children?: React.ReactNode;
    onClickNext?: () => void;
}) {
    return (
        <div className="h-full grid grid-rows-12 justify-between px-10 pb-52 pt-52">
            {/* top card area */}
            <div className="row-span-10">{children}</div>
            {/* bottom card area */}
            <div className="row-span-2 grid gap-y-5 lg:gap-y-8 justify-center">
                <Button
                    className="bg-black w-full text-white text-sm md:text-3xl"
                    variant="shadow"
                    onClick={onClickNext}
                >
                    Next
                </Button>
                <Link href="#" className="text-white text-center text-sm md:text-3xl" underline="hover">
                    already part of Dey00ts Network? log in instead
                </Link>
            </div>
        </div>
    );
}
