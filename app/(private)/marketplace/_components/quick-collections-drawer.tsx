"use client"

import { useState } from "react"
import { Check, ChevronRight, FolderPlus, Pencil, Trash2, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface QuickCollectionsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickCollectionsDrawer({ open, onOpenChange }: QuickCollectionsDrawerProps) {
  const [collections, setCollections] = useState([
    { id: "1", name: "Summer Essentials", count: 5, isEditing: false },
    { id: "2", name: "Best Sellers", count: 12, isEditing: false },
    { id: "3", name: "To Review Later", count: 3, isEditing: false },
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        count: 0,
        isEditing: false,
      }
      setCollections([...collections, newCollection])
      setNewCollectionName("")
      setIsCreating(false)
    }
  }

  const handleEditCollection = (id: string, isEditing: boolean) => {
    setCollections(collections.map(collection => 
      collection.id === id ? { ...collection, isEditing } : collection
    ))
  }

  const handleUpdateCollectionName = (id: string, name: string) => {
    if (name.trim()) {
      setCollections(collections.map(collection => 
        collection.id === id ? { ...collection, name: name.trim(), isEditing: false } : collection
      ))
    }
  }

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(collection => collection.id !== id))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="text-lg sm:text-xl">Your Collections</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 sm:space-y-6">
          <div className="space-y-2">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3 transition-colors",
                  "hover:bg-muted/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
                  collection.isEditing ? "border-primary" : "border-muted"
                )}
              >
                {collection.isEditing ? (
                  <div className="flex w-full items-center gap-2">
                    <Input
                      value={collection.name}
                      onChange={(e) =>
                        setCollections(
                          collections.map(c => 
                            c.id === collection.id ? { ...c, name: e.target.value } : c
                          )
                        )
                      }
                      className="h-9 flex-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateCollectionName(collection.id, collection.name)
                        } else if (e.key === "Escape") {
                          handleEditCollection(collection.id, false)
                        }
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleUpdateCollectionName(collection.id, collection.name)}
                      disabled={!collection.name.trim()}
                      aria-label="Save changes"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleEditCollection(collection.id, false)}
                      aria-label="Cancel editing"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium text-sm sm:text-base">{collection.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {collection.count} {collection.count === 1 ? "product" : "products"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditCollection(collection.id, true)}
                        aria-label={`Edit ${collection.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteCollection(collection.id)}
                        aria-label={`Delete ${collection.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        asChild
                        aria-label={`View ${collection.name}`}
                      >
                        <Link href={`/marketplace/collections/${collection.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {isCreating ? (
            <div className="flex items-center gap-2 rounded-lg border border-primary p-3">
              <Input
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="h-9 flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateCollection()
                  } else if (e.key === "Escape") {
                    setIsCreating(false)
                    setNewCollectionName("")
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleCreateCollection}
                disabled={!newCollectionName.trim()}
                aria-label="Create collection"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => {
                  setIsCreating(false)
                  setNewCollectionName("")
                }}
                aria-label="Cancel creating collection"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full h-10 sm:h-11"
              onClick={() => setIsCreating(true)}
              aria-label="Create new collection"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              <span className="text-sm sm:text-base">Create New Collection</span>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}