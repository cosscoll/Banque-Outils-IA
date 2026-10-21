"""Offline structural checks. Passes only for a real readable GLB with actual meshes."""
import sys, os
import trimesh
path = sys.argv[1] if len(sys.argv)>1 else 'web/public/assets/webpage-sculpture.glb'
assert os.path.isfile(path), f'Missing glb: {path}'
scene = trimesh.load(path, force='scene')
assert isinstance(scene,trimesh.Scene), 'Not a glTF scene'
triangles = sum(len(mesh.faces) for mesh in scene.geometry.values() if isinstance(mesh,trimesh.Trimesh))
assert triangles > 250, f'Not enough 3D geometry: {triangles}'
assert triangles < 200_000, f'Too heavy for a simple site: {triangles}'
assert len(scene.geometry) >= 4, 'Several semantic 3D components expected'
assert all(mesh.is_winding_consistent for mesh in scene.geometry.values() if isinstance(mesh,trimesh.Trimesh)), 'Broken winding'
print(f'3D ASSET PASS: {len(scene.geometry)} meshes, {triangles} triangles, {os.path.getsize(path):,} bytes, extents {scene.extents}')
