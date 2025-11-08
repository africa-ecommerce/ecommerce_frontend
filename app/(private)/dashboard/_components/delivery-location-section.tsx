"use client";

import { useState, useEffect } from "react";
import { X, Plus, MapPin, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLgasForState, getStatesAsStrings } from "@/lib/utils";

interface DeliveryLocation {
  id: string;
  state: string;
  lgas: string[]; // "ALL" means all LGAs in that state
  fee: number;
}

interface DeliveryLocationSectionProps {
  onChange: (locations: DeliveryLocation[]) => void;
  defaultData?: DeliveryLocation[];
  onValidationChange?: (isValid: boolean) => void;
}



export default function DeliveryLocationSection({
  onChange,
  defaultData = [],
  onValidationChange,
}: DeliveryLocationSectionProps) {
  const [locations, setLocations] = useState<DeliveryLocation[]>(defaultData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLgas, setSelectedLgas] = useState<string[]>([]);
  const [deliveryFee, setDeliveryFee] = useState("");
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());

  const states = getStatesAsStrings();

  useEffect(() => {
    onChange(locations);
    // Validate: all locations must have at least one LGA and a fee > 0
    const isValid =
      locations.length === 0 ||
      locations.every((loc) => loc.lgas.length > 0 && loc.fee > 0);
    onValidationChange?.(isValid);
  }, [locations, onChange, onValidationChange]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLgas([]);
  };

  const toggleLga = (lga: string) => {
    if (lga === "ALL") {
      // Toggle all LGAs
      const allLgas = getLgasForState(selectedState);
      if (selectedLgas.includes("ALL")) {
        setSelectedLgas([]);
      } else {
        setSelectedLgas(["ALL", ...allLgas]);
      }
    } else {
      // Toggle individual LGA
      const newLgas = selectedLgas.includes(lga)
        ? selectedLgas.filter((l) => l !== lga && l !== "ALL")
        : [...selectedLgas.filter((l) => l !== "ALL"), lga];

      // Check if all LGAs are now selected
      const allLgas = getLgasForState(selectedState);
      if (newLgas.length === allLgas.length) {
        setSelectedLgas(["ALL", ...allLgas]);
      } else {
        setSelectedLgas(newLgas);
      }
    }
  };

  const handleAddLocation = () => {
    if (!selectedState || selectedLgas.length === 0 || !deliveryFee) {
      return;
    }

    const fee = parseFloat(deliveryFee);
    if (isNaN(fee) || fee <= 0) {
      return;
    }

    // Check if state already exists
    const existingStateIndex = locations.findIndex(
      (loc) => loc.state === selectedState
    );

    if (existingStateIndex !== -1) {
      // Update existing state
      const updatedLocations = [...locations];
      const existingLgas = new Set(updatedLocations[existingStateIndex].lgas);

      selectedLgas.forEach((lga) => {
        if (lga !== "ALL") {
          existingLgas.add(lga);
        }
      });

      updatedLocations[existingStateIndex] = {
        ...updatedLocations[existingStateIndex],
        lgas: Array.from(existingLgas),
        fee: selectedLgas.includes("ALL")
          ? fee
          : updatedLocations[existingStateIndex].fee,
      };

      setLocations(updatedLocations);
    } else {
      // Add new location
      const newLocation: DeliveryLocation = {
        id: Date.now().toString(),
        state: selectedState,
        lgas: selectedLgas.filter((lga) => lga !== "ALL"),
        fee,
      };
      setLocations([...locations, newLocation]);
    }

    // Reset form
    setSelectedState("");
    setSelectedLgas([]);
    setDeliveryFee("");
    setShowAddForm(false);
  };

  const handleRemoveLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const toggleStateExpansion = (state: string) => {
    const newExpanded = new Set(expandedStates);
    if (newExpanded.has(state)) {
      newExpanded.delete(state);
    } else {
      newExpanded.add(state);
    }
    setExpandedStates(newExpanded);
  };

  const availableLgas = selectedState ? getLgasForState(selectedState) : [];
  const hasAllSelected = selectedLgas.includes("ALL");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Delivery Locations & Fees
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Set delivery fees for different locations
          </p>
        </div>
        {!showAddForm && (
          <Button
            type="button"
            onClick={() => setShowAddForm(true)}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Location
          </Button>
        )}
      </div>

      {/* Add Location Form */}
      {showAddForm && (
        <div className="border border-neutral-200 rounded-lg p-4 space-y-4 bg-neutral-50">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-neutral-700">
              Add Delivery Location
            </h4>
            <button
              onClick={() => {
                setShowAddForm(false);
                setSelectedState("");
                setSelectedLgas([]);
                setDeliveryFee("");
              }}
              className="p-1 hover:bg-neutral-200 rounded-full transition"
            >
              <X className="h-4 w-4 text-neutral-600" />
            </button>
          </div>

          {/* State Selection */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Choose a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* LGA Selection */}
          {selectedState && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                Select LGAs
              </label>
              <div className="border border-neutral-300 rounded-lg bg-white max-h-48 overflow-y-auto">
                {/* All Option */}
                <label className="flex items-center px-3 py-2.5 hover:bg-neutral-50 cursor-pointer border-b border-neutral-200">
                  <input
                    type="checkbox"
                    checked={hasAllSelected}
                    onChange={() => toggleLga("ALL")}
                    className="h-4 w-4 text-orange-500 border-neutral-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm font-medium text-neutral-800">
                    All {selectedState}
                  </span>
                  <span className="ml-auto text-xs text-neutral-500">
                    ({availableLgas.length} LGAs)
                  </span>
                </label>

                {/* Individual LGAs */}
                {availableLgas.map((lga) => (
                  <label
                    key={lga}
                    className="flex items-center px-3 py-2 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLgas.includes(lga)}
                      onChange={() => toggleLga(lga)}
                      className="h-4 w-4 text-orange-500 border-neutral-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-neutral-700">{lga}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {selectedLgas.filter((l) => l !== "ALL").length} LGA(s) selected
              </p>
            </div>
          )}

          {/* Delivery Fee */}
          {selectedState && selectedLgas.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                Delivery Fee (₦)
              </label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                placeholder="Enter delivery fee"
                min="0"
                step="100"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleAddLocation}
            disabled={
              !selectedState ||
              selectedLgas.length === 0 ||
              !deliveryFee ||
              parseFloat(deliveryFee) <= 0
            }
            className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300"
          >
            Add Location
          </Button>
        </div>
      )}

      {/* Display Added Locations */}
      {locations.length > 0 && (
        <div className="space-y-2">
          {locations.map((location) => {
            const isExpanded = expandedStates.has(location.state);
            const allLgas = getLgasForState(location.state);
            const isAllLgas = location.lgas.length === allLgas.length;

            return (
              <div
                key={location.id}
                className="border border-neutral-200 rounded-lg bg-white overflow-hidden"
              >
                <div className="flex items-center justify-between p-3 hover:bg-neutral-50">
                  <div className="flex items-center gap-3 flex-1">
                    <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-800">
                          {location.state}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                          ₦{location.fee.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {isAllLgas
                          ? `All ${location.state} (${location.lgas.length} LGAs)`
                          : `${location.lgas.length} LGA(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isAllLgas && (
                      <button
                        onClick={() => toggleStateExpansion(location.state)}
                        className="p-1 hover:bg-neutral-200 rounded transition"
                      >
                        <ChevronDown
                          className={`h-4 w-4 text-neutral-600 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveLocation(location.id)}
                      className="p-1 hover:bg-red-100 rounded transition"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Expanded LGA List */}
                {isExpanded && !isAllLgas && (
                  <div className="px-3 pb-3 pt-0">
                    <div className="flex flex-wrap gap-1.5 pl-7">
                      {location.lgas.map((lga) => (
                        <span
                          key={lga}
                          className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
                        >
                          {lga}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {locations.length === 0 && !showAddForm && (
        <div className="text-center py-8 border border-dashed border-neutral-300 rounded-lg">
          <MapPin className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm text-neutral-500">
            No delivery locations added
          </p>
         
        </div>
      )}
    </div>
  );
}