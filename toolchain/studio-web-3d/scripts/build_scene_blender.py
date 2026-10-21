"""Create an original 3D web-page sculpture (GLB + hero preview), Blender 4.x/5.x.
No paid textures, libraries or assets are downloaded.
Run: blender --background --python scripts/build_scene_blender.py -- --out web/public/assets
"""
from __future__ import annotations
import bpy, math, sys, os, argparse
from mathutils import Vector

parser = argparse.ArgumentParser()
parser.add_argument('--out', default='web/public/assets')
argv = sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
args = parser.parse_args(argv)
out = os.path.abspath(args.out)
os.makedirs(out, exist_ok=True)

bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for material in tuple(bpy.data.materials): bpy.data.materials.remove(material)


def material(name, rgb, metallic=0.0, roughness=.35):
    mat = bpy.data.materials.new(name=name)
    mat.diffuse_color = (*rgb, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*rgb, 1)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    return mat

metal = material('01 — Brushed titanium / structure', (.45,.56,.61), .86,.18)
copper = material('02 — Burnished copper / interaction', (.95,.40,.17), .77,.23)
ivory = material('03 — Warm ivory / content', (.92,.88,.79), .20,.42)
ink = material('04 — Graphite / interface depth', (.045,.056,.068), .25,.30)

# Sculptural concept: a webpage *physically unfurling* from a curved typographic sheet.
# All elements communicate the structure -> content -> interactions of a website.
sculpt = bpy.data.objects.new('WEB_PAGE_SCULPTURE', None)
bpy.context.collection.objects.link(sculpt)
sculpt.empty_display_type='PLAIN_AXES'

def sheet(name, layer, material_ref, width, amplitude, shift):
    vertices=[]; faces=[]; segments=88
    for i in range(segments+1):
        t = i/segments
        theta = math.pi*(.10+1.45*t)
        # A bent piece of a single page; each layer occupies a distinct depth.
        px = 2.6*math.cos(theta)-.23
        py = 0.6*math.sin(theta*2.0) + layer * .34
        pz = 2.1*math.sin(theta) + 0.20 + shift
        # Width direction orthogonal to tangent, with a changing fold.
        nx = -.32*math.sin(theta)
        ny = width*math.cos(theta*.55)
        nz = .17*math.cos(theta)
        fold = amplitude*math.sin(t*math.pi*2.4)
        for side in (-1,1):
            vertices.append((px + side*nx, py + side*ny, pz + fold + side*nz))
    for i in range(segments):
        a=2*i
        faces.append((a,a+1,a+3,a+2))
    mesh=bpy.data.meshes.new(name+'_surface')
    mesh.from_pydata(vertices,[],faces)
    mesh.update()
    obj=bpy.data.objects.new(name,mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material_ref)
    obj.parent=sculpt
    solid=obj.modifiers.new('Physical material thickness','SOLIDIFY')
    solid.thickness = .055
    solid.offset=0
    bevel=obj.modifiers.new('Light-catching edge','BEVEL')
    bevel.width=.025; bevel.segments=2
    normal=obj.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    for p in mesh.polygons:p.use_smooth=True
    return obj

sheet('01_STRUCTURE__sculpted_website_frame', -.85, metal, .46, .09, -.26)
sheet('02_CONTENT__unfolding_page', .02, ivory, .57, -.045, .04)
sheet('03_INTERACTION__copper_motion_track', .91, copper, .21, .04, .22)

# Small, recognizable website UI marks anchored to the web-page sculpture.
def block(name,location,scale, mat, bevel=.06):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    o=bpy.context.object; o.name=name
    o.dimensions=scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(mat)
    o.parent=sculpt
    if bevel:
        b=o.modifiers.new('Soft product edges','BEVEL'); b.width=bevel;b.segments=3
        o.modifiers.new('Normals','WEIGHTED_NORMAL')
    return o

block('WEBSITE_UI__navigation_shell',(-1.26,-1.05,.88),(1.42,.12,.18),ink,.045)
for i in range(3):
    block('WEBSITE_UI__section_'+str(i+1),(-1.79+i*.42,-1.18,.88),(.26,.07,.055),copper if i==0 else ivory,.02)
block('WEBSITE_UI__hero_illustration',(1.4,.66,1.55),(.55,.10,.73),ink,.06)
block('WEBSITE_UI__live_content',(1.36,.51,1.49),(.27,.05,.47),ivory,.04)
block('WEBSITE_UI__cta',(1.45,.40,1.20),(.25,.065,.09),copper,.035)

# Animation baked into GLB: scroll or hover can drive the same authored movement.
sculpt.rotation_euler=(0,0,-.25)
sculpt.keyframe_insert(data_path='rotation_euler', frame=1)
sculpt.rotation_euler=(.10, .10, .10)
sculpt.keyframe_insert(data_path='rotation_euler', frame=62)
sculpt.rotation_euler=(0, 0, .43)
sculpt.keyframe_insert(data_path='rotation_euler', frame=121)

# Export only original sculpted objects; no camera and no lamps in glTF.
bpy.ops.object.select_all(action='DESELECT')
for obj in bpy.context.scene.objects:
    if obj == sculpt or obj.parent == sculpt:obj.select_set(True)
bpy.context.view_layer.objects.active=sculpt
bpy.ops.export_scene.gltf(filepath=os.path.join(out,'webpage-sculpture.glb'),
    export_format='GLB',use_selection=True,export_animations=True,export_apply=False)

# Editorial studio lighting for *the preview*, independently of browser rendering.
bpy.ops.object.select_all(action='DESELECT')
world=bpy.context.scene.world or bpy.data.worlds.new('Dark gallery')
bpy.context.scene.world=world;world.use_nodes=True
world.node_tree.nodes.get('Background').inputs['Color'].default_value=(.012,.019,.024,1)
world.node_tree.nodes.get('Background').inputs['Strength'].default_value=.55

def area(name, loc, power, color, size):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.color=color;data.shape='DISK';data.size=size
    obj=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(obj)
    obj.location=loc;direction=Vector((0,0,.8))-obj.location
    obj.rotation_euler=direction.to_track_quat('-Z','Y').to_euler()
area('Large diffused key',(0,-5,7),950,(.93,.95,1),5.5)
area('Copper rim',(-4,2,3.5),780,(1,.55,.33),4)
area('Cool fill',(4,3,3),1100,(.42,.66,1),4.5)
cam_data=bpy.data.cameras.new('Camera');cam=bpy.data.objects.new('Camera',cam_data)
bpy.context.collection.objects.link(cam)
cam.location=(5,-8.7,4.0)
cam.rotation_euler=(Vector((0,0,1.15))-cam.location).to_track_quat('-Z','Y').to_euler()
cam_data.type='ORTHO';cam_data.ortho_scale=7.0
bpy.context.scene.camera=cam
sculpt.rotation_euler=(.08,.08,.16)
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=18
scene.render.resolution_x=1200;scene.render.resolution_y=900;scene.render.resolution_percentage=70
scene.render.image_settings.file_format='PNG'
scene.render.film_transparent=False
scene.render.filepath=os.path.join(out,'preview.png')
scene.view_settings.view_transform='AgX'
bpy.ops.render.render(write_still=True)
print('STUDIO_3D_OK', os.path.join(out,'webpage-sculpture.glb'),scene.render.filepath)
