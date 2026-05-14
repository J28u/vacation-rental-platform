import { rentalsAPI } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CreateRentalRequest } from "../types/api";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type RentalFormProps = {
  mode: "create" | "update";
  rentalId?: number;
};

export default function RentalForm({ mode, rentalId }: RentalFormProps) {
  const isCreate = mode === "create";

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRentalRequest>();

  const mutation = useMutation({
    mutationFn: isCreate
      ? rentalsAPI.create
      : (data) => rentalsAPI.update({ id: rentalId!, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
  });

  const onSubmit = (data: CreateRentalRequest) => {
    mutation.mutate(data);
  };

  const buttonInactive = isCreate ? "Ajout..." : "Modification...";
  const buttonActive = isCreate ? "Ajouter" : "Modifier";

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={isCreate ? "/" : `/rental/${rentalId}`}
        className="text-primary hover:underline flex items-center"
      >
        ← Retour
      </Link>
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isCreate
                ? "Ajouter une nouvelle location"
                : "Modifier une location"}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {mutation.isError && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{mutation.error.message}</p>
              </div>
            )}
            {mutation.isSuccess && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  {mutation.data.message}
                </p>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  {...register("name", {
                    required: isCreate ? "Le nom est requis" : false,
                  })}
                />
                {errors.name && (
                  <p className="text-gray-500">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Surface (m²)"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  {...register("surface", {
                    required: isCreate ? "La surface est requise" : false,
                    valueAsNumber: true,
                  })}
                />
                {errors.surface && (
                  <p className="text-gray-500">
                    {errors.surface.message as string}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Prix (€ / mois)"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  {...register("price", {
                    required: isCreate ? "Le prix est requis" : false,
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <p className="text-gray-500">
                    {errors.price.message as string}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Description"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  {...register("description", {
                    required: isCreate ? "La description est requise" : false,
                  })}
                />
                {errors.description && (
                  <p className="text-gray-500">
                    {errors.description.message as string}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("picture", {
                    required: isCreate ? "Une image est requise" : false,
                  })}
                  className="mt-2 appearance-none rounded-none relative block px-3 py-2 w-full placeholder-gray-500 text-black focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.picture && (
                  <p className="text-gray-500">
                    {errors.picture.message as string}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {mutation.isPending ? buttonInactive : buttonActive}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
