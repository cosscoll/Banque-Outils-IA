"""WEB PRESS / Original kinetic letterpress for Banque Outils IA.
G2 asset build: .blend + .glb + real Blender Cycles CPU renders, no external assets.
Usage: blender -b -t 4 --python scripts/build_webpress.py -- --out output
Run with Blender 3.4+; all shapes, shaders and fonts are procedural/original.
"""
import bpy, math, os, sys, argparse, random
from mathutils import Vector

args = argparse.ArgumentParser(); args.add_argument('--out',default='output'); args.add_argument('--samples',type=int,default=40); args.add_argument('--size',type=int,default=1200)
a = args.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []); OUT=os.path.abspath(a.out); os.makedirs(OUT,exist_ok=True)

bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for x in list(bpy.data.materials): bpy.data.materials.remove(x)
S = bpy.context.scene; S.render.engine='CYCLES'; S.cycles.samples=a.samples
if hasattr(S.cycles,'use_denoising'): S.cycles.use_denoising=False
for L in S.view_layers:
 if hasattr(L.cycles,'use_denoising'): L.cycles.use_denoising=False
S.render.resolution_x=a.size; S.render.resolution_y=int(a.size*.69); S.render.resolution_percentage=100
S.render.image_settings.file_format='PNG'; S.render.film_transparent=False
S.view_settings.view_transform='Filmic'; S.view_settings.look='Medium High Contrast'; S.view_settings.exposure=0; S.view_settings.gamma=1
S.render.engine='CYCLES'
S.world.color=(.018,.025,.034)
S.frame_end=120

# Colors in linear approx; Filmic and color management provide studio tonality.
def mat(name,color,metal=0,rough=.4,coat=0,transmission=0,emit=None):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;bs=m.node_tree.nodes.get('Principled BSDF')
 bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Metallic'].default_value=metal;bs.inputs['Roughness'].default_value=rough
 for n,v in [('Coat Weight',coat),('Clearcoat',coat),('Transmission Weight',transmission),('Transmission',transmission)]:
  if n in bs.inputs:bs.inputs[n].default_value=v
 if emit:
  if 'Emission Color' in bs.inputs:bs.inputs['Emission Color'].default_value=(*emit,1)
  if 'Emission' in bs.inputs:bs.inputs['Emission'].default_value=(*emit,1)
  if 'Emission Strength' in bs.inputs:bs.inputs['Emission Strength'].default_value=.7
 return m

ink=mat('01 Graphite / anodised #14222B',(.043,.073,.091),metal=.75,rough=.24)
black=mat('02 Onyx ceramic',(.012,.017,.020),metal=.3,rough=.18,coat=.2)
chrome=mat('03 Warm polished stainless',(.64,.73,.73),metal=1,rough=.15)
brass=mat('04 Brushed champagne brass',(.54,.345,.145),metal=.9,rough=.22)
bronze=mat('05 Copper rollers',(.51,.19,.095),metal=.89,rough=.23)
ivory=mat('06 Natural cotton stock',(.88,.83,.72),metal=0,rough=.87)
inkmark=mat('07 Press ink / near black',(.026,.043,.051),metal=0,rough=.94)
muted=mat('08 Inscribed details',(.30,.34,.32),metal=.04,rough=.8)
red=mat('09 Oxide lacquer / burnt vermilion',(.62,.16,.085),metal=.35,rough=.23)
glass=mat('10 Smoked optical glass',(.08,.135,.16),metal=.12,rough=.09,transmission=.53)
emiss=mat('11 Warm instrument light',(.9,.65,.31),metal=.04,rough=.35,emit=(.95,.42,.13))
back=mat('12 Seamless background',(.032,.042,.052),rough=.96)

MODEL=bpy.data.collections.new('WEB_PRESS__ORIGINAL_ASSETS');S.collection.children.link(MODEL)

def place(o,name,material=None,coll=MODEL):
 o.name=name
 for col in tuple(o.users_collection):col.objects.unlink(o)
 coll.objects.link(o)
 if material:o.data.materials.append(material)
 return o

def cube(name,loc,dim,mt,bevel=.06):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.dimensions=dim; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 place(o,name,mt)
 if bevel:
  m=o.modifiers.new('machined edges · bevel','BEVEL');m.width=bevel;m.segments=3
  m=o.modifiers.new('weighted normals','WEIGHTED_NORMAL')
 return o

def cyl(name,loc,radius,depth,mt,verts=48,axis='Z',bevel=.03):
 bpy.ops.mesh.primitive_cylinder_add(vertices=verts,radius=radius,depth=depth,location=loc);o=bpy.context.object
 place(o,name,mt)
 if axis=='Y':o.rotation_euler[0]=math.pi/2
 if axis=='X':o.rotation_euler[1]=math.pi/2
 if bevel:
  b=o.modifiers.new('precision milled', 'BEVEL');b.width=bevel;b.segments=3
  o.modifiers.new('weighted normals','WEIGHTED_NORMAL')
 return o

def tor(name,loc,major,minor,mt,rot=(0,0,0)):
 bpy.ops.mesh.primitive_torus_add(major_segments=80,minor_segments=10,location=loc,rotation=rot,major_radius=major,minor_radius=minor);o=bpy.context.object;place(o,name,mt);return o

def text(name,body,loc,size,mt,rot=(0,0,0),extrude=.0008,align='LEFT'):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.size=size;c.extrude=extrude;c.bevel_depth=.0003;c.align_x=align;o=bpy.data.objects.new(name,c);MODEL.objects.link(o);o.location=loc;o.rotation_euler=rot;o.data.materials.append(mt);return o

def rod(name,start,end,r,mt):
 mid=(Vector(start)+Vector(end))/2;vec=Vector(end)-Vector(start)
 o=cyl(name,mid,r,vec.length,mt,axis='Z',verts=24,bevel=.009);o.rotation_euler=vec.to_track_quat('Z','Y').to_euler();return o

# BASE : physical analog machine with a hero-printing stage.
cube('Chassis / freestanding collector plinth',(0,0,-1.18),(7.5,4.78,.6),ink,.18)
cube('Solid brushed bronze perimeter / lower',(0,0,-.91),(7.13,4.45,.1),brass,.04)
cube('Ceramic precision bed',(0,0,-.53),(6.62,4.12,.67),black,.16)
cube('Lapped steel insert / printable bed',(0,0,-.18),(5.68,3.18,.07),chrome,.025)
cube('Clamping platform',(0,0,-.10),(5.22,2.84,.07),ink,.024)
# feet/plinth pads
for ix in [-3.08,3.08]:
 for iy in [-1.77,1.77]:
  cyl('Pneumatic isolator / bronze foot',(ix,iy,-1.62),.22,.30,brass,32)
  cyl('Rubber isolator',(ix,iy,-1.76),.27,.08,black,32)
# columns and structural beam
for ix in [-2.54,2.54]:
 for iy in [-1.37,1.37]:
  cyl('Polished structural guide',(ix,iy,1.42),.115,3.27,chrome,48)
  cyl('Bronze guide foot',(ix,iy,-.01),.23,.26,brass,40)
  cyl('Satin guide collar',(ix,iy,2.86),.22,.19,ink,48)
# heavy arch beam with inset hardware
cube('Upper force beam / suspended gantry',(0,0,3.08),(6.18,3.64,.62),ink,.14)
cube('Gantry / outer brass guide stripe',(0,-1.855,3.14),(5.98,.045,.43),brass,.009)
cube('Upper edge accent',(0,0,3.46),(6.02,3.50,.045),chrome,.013)
for ix in [-2.65,2.65]:
 for iy in [-1.35,1.35]:
  cyl('Gantry bolt / M12',(ix,iy,3.46),.115,.065,brass,6)
# compression cylinder from beam to platen
cyl('Hydraulic ram / outer',(0,0,2.62),.41,1.22,chrome,64)
cyl('Hydraulic ram / sleeve',(0,0,2.62),.27,1.05,black,64)
platen=cube('PLATEN__ANIMATED',(0,0,1.80),(4.74,2.74,.36),brass,.07)
under=cube('PLATEN__die_surface',(0,0,1.585),(4.36,2.42,.07),black,.025);under.parent=platen;under.matrix_parent_inverse=platen.matrix_world.inverted()
# platen bolts 12 perimeter
for ix in [-2.07,2.07]:
 for iy in [-1.12,1.12]:
  q=cyl('Platen precision screw',(ix,iy,1.99),.095,.025,chrome,6);q.parent=platen;q.matrix_parent_inverse=platen.matrix_world.inverted()
# printer sheet under platen
paper=cube('PAPER__ANIMATED__MASTER_SHEET',(0,-.05,.12),(3.42,2.22,.055),ivory,.008)
paper_details=[]
# layered page stack
for k in range(4):cube('Unprinted cream stock %02d'%k,(0,-.04,.035-k*.035),(3.47,2.24,.03),ivory,.006)
# raised text and printed bars on paper, lowered to visible
front='BANK / TOOLS'
headline=text('Embossed paper masthead',front,(-1.47,-.92,.157),.28,inkmark,extrude=.0018);paper_details.append(headline)
paper_details.append(text('Embossed paper subhead','A CREATIVE WEB TOOLKIT',(-1.45,-.55,.158),.11,muted))
for j,ln in enumerate([2.18,1.94,1.78]):
 paper_details.append(cube('Typography line %d'%j,(-.40,-.18+j*.18,.156),(ln,.036,.006),muted,.002))
# physical modular interface holders/ die inserts in sheet
for j,x in enumerate([-1.02,-.32,.38,1.08]):
 paper_details.append(cube('Pressable module tile %d'%j,(x,.65,.158),(.56,.45,.015),bronze if j==3 else inkmark,.012))
 paper_details.append(cube('Module gloss inlay %d'%j,(x,.65,.171),(.43,.28,.008),emiss if j==3 else glass,.012))

for item in paper_details:
 item.parent=paper;item.matrix_parent_inverse=paper.matrix_world.inverted()

# Front-facing letterpress legend on the machine
text('FRONT_WORDMARK','THE WEB PRESS',(-2.87,-2.095,-.55),.30,ivory,(math.pi/2,0,0),extrude=.003)
text('FRONT_CAPTION','WORKSHOP   /   001',(-2.82,-2.098,-.82),.13,brass,(math.pi/2,0,0),extrude=.0015)
# information labels on top beam facing camera
text('UPPER_BRAND','FORM / FUNCTION',(-2.66,-1.845,2.98),.23,ivory,(math.pi/2,0,0),extrude=.002)
text('UPPER_ANNOTATION','MAKE THE WEB TANGIBLE',(1.0,-1.847,2.97),.10,brass,(math.pi/2,0,0))

# INK ROLLERS: monumental cylinders on side rails; copper with ribbed black grips.
for ix in [-1.94,1.94]:
 o=cyl('Copper ink roller / embossed',(ix,-.06,1.03),.32,2.94,bronze,64,axis='Y')
 for y in [-1.45,1.45]:cyl('Roller / machined end ring',(ix,y,1.03),.37,.105,chrome,64,axis='Y')
 for y in [-1.56,1.56]:cyl('Roller / black axle end',(ix,y,1.03),.15,.14,black,32,axis='Y')
 # roller thin recessed bands
 for y in [-1.12,-.74,-.36,.36,.74,1.12]:cyl('Roller grip groove',(ix,y,1.03),.325,.013,brass,48,axis='Y',bevel=.002)

# FRONT MECHANICAL DIAL (meaningful cursor/touch interaction)
# A ring in XZ plane, mounted to face -Y.
wheel=tor('WHEEL__INTERACTIVE__SPINNER',(2.98,-2.44,.47),.39,.049,brass,(math.pi/2,0,0))
cyl('Wheel inner hub',(2.98,-2.47,.47),.14,.19,ink,48,axis='Y')
for i in range(8):
 theta=i*2*math.pi/8
 rod('Wheel spoke', (2.98+math.cos(theta)*.12,-2.47,.47+math.sin(theta)*.12),(2.98+math.cos(theta)*.36,-2.47,.47+math.sin(theta)*.36),.032,chrome)
cyl('Knurled wheel knob',(2.98,-2.60,.47),.12,.1,brass,48,axis='Y')
# left analog toggle and analog gauge
cube('Controls dock / left',(-2.79,-2.43,.0),(.86,.24,.77),ink,.10)
for j in range(3):
 cyl('Gauge node %d'%j,(-2.95+j*.18,-2.59,.04),.045,.06,emiss if j==0 else brass,16,axis='Y')
rod('Manual drive lever',(-2.63,-2.53,.25),(-2.27,-2.71,.69),.065,chrome)
cyl('Lever knob',(-2.27,-2.71,.69),.13,.2,black,30,axis='Y')

# Rear content carriage: printer physical cartridge packs and tracks
for y in [-1.84,1.84]:
 cube('Horizontal chrome rail',(0,y,.82),(5.92,.08,.10),chrome,.032)
for k,x in enumerate([-1.53,-.64,.25,1.14]):
 # physical print blocks behind press; original branded tabs, not arbitrary shapes
 cube('Stored type die %d'%k,(x,1.90,1.38),(.72,.42,.74),ink if k%2 else bronze,.058)
 text('Die stamping %d'%k,['TYPE','GRID','CODE','MOVE'][k],(x-.26,1.666,1.24),.12,ivory,(math.pi/2,0,0),extrude=.001)

# Screws everywhere meaningful / industrial detailing
for side in [-1,1]:
 for ix in [-2.20,-1.0,1.0,2.2]:
  cyl('Bed fastening / side %d'%side,(ix,side*1.54,-.16),.065,.045,brass,6)

# studio ground, created outside GLB collection to avoid export
WORLD=bpy.data.collections.new('RENDER_STUDIO_NOT_EXPORTED');S.collection.children.link(WORLD)
def studio_object(obj):
 for coll in tuple(obj.users_collection):coll.objects.unlink(obj)
 WORLD.objects.link(obj)

floor=cube('Stage floor',(0,0,-1.82),(200,200,.2),back,.0);studio_object(floor)

def area(name,location,color,energy,size,target):
 d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.color=color;d.shape='DISK';d.size=size
 o=bpy.data.objects.new(name,d);WORLD.objects.link(o);o.location=location;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler();return o
area('KEY | huge softbox',(1,-6.6,8), (1,.88,.75),1300,6,(0,0,.9))
area('RIM | cool',(-5,4,7),(.45,.66,1),1600,5,(0,0,1.3))
area('BACK | warm',(5,5,6),(1,.49,.28),1450,4,(0,0,1.5))
area('FRONT low fill',(-3,-8,2.5),(.80,.87,1),450,5,(0,0,.3))

# Two-empty rig and 4 camera states; named for GLB timeline link.
def empty(name,loc):
 o=bpy.data.objects.new(name,None); MODEL.objects.link(o);o.location=loc;return o
rig=empty('CAMERA_RIG',(0,0,0));target=empty('CAMERA_TARGET',(0,0,.9))
camera_data=bpy.data.cameras.new('CINEMATIC_50MM');cam=bpy.data.objects.new('CAMERA_3D_BAKED',camera_data);MODEL.objects.link(cam);S.camera=cam
cam.data.type='PERSP';cam.data.lens=42

def set_cam(frame,point,look,ortho=False):
 S.frame_set(frame);cam.location=point;cam.rotation_euler=(Vector(look)-Vector(point)).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert('location',frame=frame);cam.keyframe_insert('rotation_euler',frame=frame)
 target.location=look;target.keyframe_insert('location',frame=frame)
set_cam(1,(8.7,-12.8,7.4),(0,0,1.05))
set_cam(31,(6.5,-9.2,5.8),(0,0,1.22))
set_cam(61,(6.7,-7.0,6.4),(0,-.1,1.25))
set_cam(91,(3.2,-6.8,3.0),(1.6,-.1,.56))
set_cam(120,(7.8,-10.0,6.4),(0,0,1.36))

# keyframed meaningful movement; separated from rest of machine
for frame,z in [(1,1.80),(31,1.75),(61,2.55),(91,2.62),(120,1.82)]:
 S.frame_set(frame);platen.location.z=z;platen.keyframe_insert('location',frame=frame)
for frame,z,rotz in [(1,.12,0),(31,.12,0),(61,.75,0),(91,1.32,.12),(120,.12,0)]:
 S.frame_set(frame);paper.location.z=z;paper.rotation_euler[2]=rotz;paper.keyframe_insert('location',frame=frame);paper.keyframe_insert('rotation_euler',frame=frame)
for f,angle in [(1,0),(31,-.30),(61,1.1),(91,2.0),(120,2*math.pi)]:
 S.frame_set(f);wheel.rotation_euler[1]=angle;wheel.keyframe_insert('rotation_euler',frame=f)

# ensure scene renders with enough exposure/transparent shadows settings
S.render.image_settings.color_mode='RGBA'; S.render.image_settings.color_depth='8'
if S.world:
 S.world.use_nodes=True;bg=S.world.node_tree.nodes.get('Background');bg.inputs['Color'].default_value=(.025,.035,.042,1);bg.inputs['Strength'].default_value=.8

# Save blender source and GLB with render-only studio collection excluded.
S.frame_set(1)
blend=os.path.join(OUT,'web-press-original.blend');bpy.ops.wm.save_as_mainfile(filepath=blend)
# select objects explicitly; include baked camera and named meshes; floor/lights excluded
bpy.ops.object.select_all(action='DESELECT')
for o in MODEL.objects:o.select_set(True)
bpy.context.view_layer.objects.active=platen
GLB=os.path.join(OUT,'web-press-original.glb')
bpy.ops.export_scene.gltf(filepath=GLB,export_format='GLB',use_selection=True,export_animations=True,export_apply=False)

for frame,suffix in [(1,'01-hero'),(61,'02-exploded'),(91,'03-macro'),(120,'04-final')]:
 S.frame_set(frame);S.render.filepath=os.path.join(OUT,suffix+'.png');bpy.ops.render.render(write_still=True)
 print('RENDERED_FRAME',frame,S.render.filepath,flush=True)

print('WEBPRESS_G2_ARTIFACTS_OK',GLB,blend,flush=True)
