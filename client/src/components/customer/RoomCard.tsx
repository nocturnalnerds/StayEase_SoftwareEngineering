import { useState } from "react";
import type { RoomType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface RoomCardProps {
  roomType: RoomType;
  onSelect: (roomTypeId: number) => void;
  isAvailable?: boolean;
  discountPercentage?: number;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomType,
  onSelect,
  isAvailable = true,
  discountPercentage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    id,
    name,
    description,
    basePrice,
    capacity,
    maxOccupancy,
    amenities,
    images,
  } = roomType;

  const displayPrice = discountPercentage
    ? basePrice * (1 - discountPercentage / 100)
    : basePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={images[0] || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          {discountPercentage && (
            <div className="absolute top-0 right-0">
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Badge className="m-2 py-1.5 px-3 bg-tertiary text-blacky font-semibold text-sm shadow-md">
                  {discountPercentage}% OFF
                </Badge>
              </motion.div>
            </div>
          )}
        </div>
        <CardHeader className="pb-2 bg-white">
          <div className="flex justify-between items-start">
            <CardTitle className="text-primary text-xl font-bold">
              {name}
            </CardTitle>
            <div className="text-right">
              {discountPercentage && (
                <span className="text-sm line-through text-gray-500 mr-2">
                  ${basePrice}
                </span>
              )}
              <span className="text-lg font-bold text-secondary">
                ${displayPrice}
              </span>
              <span className="text-xs text-gray-500">/night</span>
            </div>
          </div>
          <CardDescription className="text-sm text-gray-600">
            {capacity} {capacity > 1 ? "guests" : "guest"} · Max {maxOccupancy}{" "}
            people
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 bg-white">
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {amenities.slice(0, 4).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-whitey text-blacky text-xs border-secondary/20"
              >
                {amenity}
              </Badge>
            ))}
            {amenities.length > 4 && (
              <Badge
                variant="outline"
                className="bg-whitey text-blacky text-xs"
              >
                +{amenities.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-3 pb-4 bg-white">
          <Button
            onClick={() => onSelect(id)}
            className={`w-full transition-all duration-300 ${
              isHovered
                ? "bg-primary hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/90"
            } text-whitey font-medium`}
            disabled={!isAvailable}
          >
            {isAvailable ? "Select Room" : "Not Available"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
