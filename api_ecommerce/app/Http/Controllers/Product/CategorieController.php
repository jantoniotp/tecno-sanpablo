<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product\Categorie;

class CategorieController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth:api',['except' => ['store']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");
        $state = $request->get("state");
        $categories = Categorie::filterAdvance($state,$search)->where('name','LIKE','%'.$search.'%')->orderBy("id","desc")->get();

        return response()->json([
            "categorias" => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if($request->hasFile("imagen_file")){
            $path = \Storage::putFile("categorias",$request->file("imagen_file"));
            $request->request->add(["imagen" => $path]);
        } else {
            $request->request->add(["imagen" => '/']);
        }
        $categorie = Categorie::create($request->all());
        return response()->json([
            "categorie" => $categorie,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $categorie = Categorie::findOrFail($id);
        if($request->hasFile("imagen_file")){
            if($categorie->imagen){
                \Storage::delete($categorie->imagen);
            }
            $path = \Storage::putFile("categorias",$request->file("imagen_file"));
            $request->request->add(["imagen" => $path]);
        }
        $categorie->update($request->all());
        return response()->json([
            "categorie" => $categorie,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();
        return response()->json([
            "message" => 200,
            "categorie" => $categorie
        ]);
    }
}
