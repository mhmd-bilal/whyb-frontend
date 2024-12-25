// pages/MyProfile.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useAuth } from "@/contexts/auth-context";
import { userApi } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import { BentoGridSecondDemo } from "@/components/BentoGridSecondDemo";
import ProfileInput from "@/components/ProfileInput";
import { useToast } from "@/hooks/use-toast"
import { User, UserData } from "@/types"
import { BackHome } from "@/functions/useFunction";

const MyProfile: React.FC = () => {
  const { token, userId } = useAuth();
  const { toast } = useToast();

  const { data, error, isLoading, refetch } = useQuery<UserData>(
    ["user"],
    async (UserData) => {
      const userResponse = await userApi.getUser(userId as string, token!);
      return userResponse;
    },
    {
      enabled: !!token,
      retry: false,
    }
  );

  const [editableFields, setEditableFields] = useState<User>({
    username: "",
    name: "",
    email: "",
    bio: "",
  });

  const mutation = useMutation(
    (updatedUser: User) => userApi.updateUser(userId as string, updatedUser, token!),
    {
      onSuccess: () => {
        refetch();
        toast({
          description: "Details saved.",
        });
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            description: error.message,
          })
          console.error(error.message)
        }
      },
    }
  );

  useEffect(() => {
    if (data?.user) {
      setEditableFields({
        username: data.user.username || "",
        name: data.user.name || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
      });
    }
  }, [data]);


  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <div className="h-screen w-full flex flex-col items-center justify-center">
    Error loading profile
    <BackHome />
  </div>

  if (!data?.user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        User not found
        <BackHome />
      </div>
    )
  }

  const { user, posts, stats } = data;

  const handleSave = () => {
    mutation.mutate(editableFields);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Card className="border shadow-md rounded-lg">
        <CardHeader className="flex justify-between">
          <h2 className="text-4xl font-bold pb-0">@{user.username}&apos;s profile</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6 ">
            <div className="flex flex-col gap-2">
              <ProfileInput
                type="text"
                label="Username"
                value={user.username || ""}
                editableValue={editableFields.username || ""}
                onChange={(e) =>
                  setEditableFields({ ...editableFields, username: e.target.value })
                }
                onSave={handleSave}
              />

              <ProfileInput
                type="text"
                label="Name"
                value={user.name || ""}
                editableValue={editableFields.name || ""}
                onChange={(e) =>
                  setEditableFields({ ...editableFields, name: e.target.value })
                }
                onSave={handleSave}
              />

              <ProfileInput
                type="text"
                label="Email"
                value={user.email || ""}
                editableValue={editableFields.email || ""}
                onChange={(e) =>
                  setEditableFields({ ...editableFields, email: e.target.value })
                }
                onSave={handleSave}
              />
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-4xl font-bold">{stats.posts_count}</p>
                  <h4 className="text-muted-foreground">Posts</h4>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.comments_count}</p>
                  <h4 className="text-muted-foreground">Comments</h4>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.likes_count}</p>
                  <h4 className="text-muted-foreground">Likes</h4>
                </div>
              </div>
            </div>
            <div className="flex-1 h-full">
              <div className="h-full">
                <ProfileInput
                  type="textarea"
                  label="Bio"
                  value={user.bio || ""}
                  editableValue={editableFields.bio || ""}
                  onChange={(e) =>
                    setEditableFields({ ...editableFields, bio: e.target.value })
                  }
                  onSave={handleSave}
                />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-md rounded-lg mt-6 py-6">
        <CardContent>
          <h2 className="text-2xl font-bold pb-4">@{user.username}&apos;s posts</h2>
          <BentoGridSecondDemo data={posts} />
        </CardContent>
      </Card>
    </div>
  );
};


export default MyProfile;
